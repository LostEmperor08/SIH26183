import io
import csv
from datetime import datetime
from flask import Blueprint, request, jsonify
from app.services.blockchain_tracer import trace_to_exchange, estimate_usd_value
from app.services.etherscan_client import is_valid_address
from app.models.exchanges import get_all_exchanges, get_exchange_by_wallet, detect_blockchain_network

trace_bp = Blueprint('trace', __name__)

@trace_bp.route('/health', methods=['GET'])
def health():
    """Service health check endpoint."""
    return jsonify({
        "status": "ok",
        "service": "Real-Time Crypto Fraud Attribution System",
        "agency": "Ministry of Home Affairs / I4C (Indian Cyber Crime Coordination Centre)",
        "version": "1.0.0",
        "supported_networks": ["Ethereum / EVM", "Tron (TRC-20 USDT)", "Bitcoin"],
        "fiu_ind_ready": True
    })

@trace_bp.route('/api/exchanges', methods=['GET'])
def list_exchanges():
    """List monitored exchange entities, addresses, and FIU-IND compliance statuses."""
    return jsonify({
        "status": "success",
        "exchanges": get_all_exchanges()
    })

@trace_bp.route('/api/trace', methods=['POST'])
def single_trace():
    """Trace a single suspect wallet address."""
    try:
        data = request.get_json(silent=True) or {}
        wallet = data.get('wallet_address', '').strip()

        if not wallet:
            return jsonify({'error': 'Missing wallet_address'}), 400

        network = detect_blockchain_network(wallet)

        if not is_valid_address(wallet):
            return jsonify({
                'error': 'Invalid Ethereum/EVM wallet address format',
                'detected_network': network
            }), 400

        result = trace_to_exchange(wallet)

        if result:
            target_hop = result[-1]
            exchange_obj = get_exchange_by_wallet(target_hop.get('to')) or {}
            return jsonify({
                'status': 'success',
                'found': True,
                'wallet': wallet,
                'network': network,
                'exchange': target_hop.get('exchange', 'Unknown'),
                'exchange_name': target_hop.get('exchange_name', ''),
                'jurisdiction': exchange_obj.get('jurisdiction', 'International'),
                'fiu_registered': exchange_obj.get('fiu_registered', False),
                'hops': len(result),
                'amount_eth': target_hop.get('amount_eth', 0.0),
                'amount_usd': target_hop.get('amount_usd', 0.0),
                'compliance_email': target_hop.get('compliance_email'),
                'path': result
            })
        else:
            return jsonify({
                'status': 'not_found',
                'found': False,
                'wallet': wallet,
                'network': network,
                'message': 'No exchange destination detected within 2 hops (Funds in-transit or held in burner/mixer)'
            }), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@trace_bp.route('/api/batch-trace', methods=['POST'])
def batch_trace():
    """Batch trace wallets provided in a CSV file or JSON array."""
    try:
        wallet_list = []

        # 1. Check if multipart file was sent
        if 'file' in request.files:
            uploaded_file = request.files['file']
            content = uploaded_file.stream.read().decode('utf-8', errors='ignore')
            reader = csv.DictReader(io.StringIO(content))
            
            if reader.fieldnames:
                wallet_col = next((col for col in reader.fieldnames if 'wallet' in col.lower() or 'address' in col.lower()), reader.fieldnames[0])
                for row in reader:
                    addr = row.get(wallet_col, '').strip()
                    if addr:
                        wallet_list.append(addr)
            else:
                wallet_list = [line.strip() for line in content.splitlines() if line.strip()]

        # 2. Check if JSON payload was sent
        elif request.is_json:
            payload = request.get_json()
            if isinstance(payload, list):
                wallet_list = [item.get('wallet_address', item) if isinstance(item, dict) else str(item).strip() for item in payload]
            elif isinstance(payload, dict) and 'wallets' in payload:
                wallet_list = [str(w).strip() for w in payload['wallets']]

        if not wallet_list:
            return jsonify({'error': 'No wallets provided in file or JSON body'}), 400

        results = []
        found_count = 0
        total_eth = 0.0
        by_exchange = {}

        for wallet in wallet_list:
            clean_wallet = wallet.strip().strip('"').strip("'")
            network = detect_blockchain_network(clean_wallet)

            if not clean_wallet or not is_valid_address(clean_wallet):
                results.append({
                    'wallet': clean_wallet,
                    'network': network,
                    'found': False,
                    'status': 'Invalid Address',
                    'exchange': None,
                    'hops': 0,
                    'amount_eth': 0.0,
                    'amount_usd': 0.0,
                    'path': []
                })
                continue

            trace_res = trace_to_exchange(clean_wallet)
            if trace_res:
                found_count += 1
                target = trace_res[-1]
                exch = target.get('exchange', 'Unknown')
                eth_val = target.get('amount_eth', 0.0)
                usd_val = target.get('amount_usd', 0.0)

                total_eth += eth_val
                by_exchange[exch] = by_exchange.get(exch, 0) + 1
                exchange_obj = get_exchange_by_wallet(target.get('to')) or {}

                results.append({
                    'wallet': clean_wallet,
                    'network': network,
                    'found': True,
                    'status': 'Attributed',
                    'exchange': exch,
                    'exchange_name': target.get('exchange_name', exch),
                    'jurisdiction': exchange_obj.get('jurisdiction', 'International'),
                    'fiu_registered': exchange_obj.get('fiu_registered', False),
                    'hops': len(trace_res),
                    'amount_eth': eth_val,
                    'amount_usd': usd_val,
                    'compliance_email': target.get('compliance_email'),
                    'path': trace_res
                })
            else:
                results.append({
                    'wallet': clean_wallet,
                    'network': network,
                    'found': False,
                    'status': 'Unattributed (In-Transit)',
                    'exchange': None,
                    'hops': 0,
                    'amount_eth': 0.0,
                    'amount_usd': 0.0,
                    'path': []
                })

        return jsonify({
            'status': 'success',
            'total': len(results),
            'found': found_count,
            'unattributed': len(results) - found_count,
            'attribution_rate': round((found_count / len(results) * 100), 1) if results else 0,
            'total_eth_traced': round(total_eth, 4),
            'total_usd_traced': estimate_usd_value(total_eth),
            'exchange_breakdown': by_exchange,
            'results': results
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@trace_bp.route('/api/generate-notice', methods=['POST'])
def generate_notice():
    """
    Generate an official Section 91 Cr.P.C. / Section 94 BNSS asset preservation notice.
    Ready for dispatch to identified exchange compliance officer.
    """
    try:
        data = request.get_json(silent=True) or {}
        wallet = data.get('wallet_address', '').strip()
        fir_no = data.get('fir_number', 'FIR-Unassigned/2026')
        police_station = data.get('police_station', 'Cyber Crime Police Station, Delhi Police')
        investigating_officer = data.get('investigating_officer', 'Investigating Officer / Cyber Cell')

        if not wallet:
            return jsonify({'error': 'Missing wallet_address'}), 400

        # Run trace to get current details
        trace_res = trace_to_exchange(wallet)
        if not trace_res:
            return jsonify({
                'error': 'Wallet not yet attributed to a known exchange destination. Cannot address freeze order.'
            }), 400

        target = trace_res[-1]
        exch = target.get('exchange', 'VASP')
        compliance_email = target.get('compliance_email', 'compliance@exchange.com')
        date_str = datetime.now().strftime("%B %d, %Y")
        case_ref = f"I4C-ETH-{datetime.now().strftime('%Y%m%d')}-{abs(hash(wallet)) % 10000:04d}"

        notice_text = f"""========================================================================
CYBER CRIME INCIDENT ASSET PRESERVATION & FREEZE DIRECTIVE
ISSUED UNDER SECTION 91 Cr.P.C. / SECTION 94 BNSS, 2023
Indian Cyber Crime Coordination Centre (I4C), CIS Division, MHA
========================================================================

Date: {date_str}
Reference Notice ID: {case_ref}
FIR / Case No: {fir_no}
Originating Police Station: {police_station}
Investigating Officer: {investigating_officer}

TO:
The Compliance & Law Enforcement Liaison Department
{exch} ({target.get('exchange_name', exch)})
Designated Official Email: {compliance_email}

SUBJECT: URGENT STATUTORY NOTICE TO PRESERVE AND FREEZE FRAUD PROCEEDS

Sir / Madam,

1. An ongoing cyber fraud investigation is being conducted regarding unauthorized siphonage of digital funds registered under NCRP complaint records.

2. Real-time automated blockchain attribution has established that proceeds of cyber crime originating from the following suspect address were deposited into your exchange platform:
   - Suspect Origin Wallet: {wallet}
   - Destination Deposit Address: {target.get('to')}
   - Hop Traversal Distance: {len(trace_res)} Hop(s)
   - Transferred Volume: {target.get('amount_eth')} ETH (Approx. ${target.get('amount_usd'):,.2f} USD)
   - Final Deposit Transaction Hash: {target.get('tx_hash')}

3. STATUTORY DIRECTIVE FOR IMMEDIATE COMPLIANCE:
   In exercise of powers vested under Section 91 of the Code of Criminal Procedure, 1973 (read with Section 94 of Bharatiya Nagarik Suraksha Sanhita, 2023):
   a) Immediately FREEZE the recipient deposit account, linked user ID, and associated crypto/fiat balances.
   b) Securely PRESERVE all KYC records, registered mobile numbers, PAN/Aadhaar/Identity documents, IP login logs with timestamps, and connected bank withdrawal details.
   c) Furnish an acknowledgment and compliance confirmation via email within 4 (four) hours of receipt of this notice to prevent dissipation of evidence.

Issued under statutory authority,
{investigating_officer}
{police_station}
Copy to: Indian Cyber Crime Coordination Centre (I4C), MHA, New Delhi (cybercrime.gov.in)
========================================================================"""

        return jsonify({
            'status': 'success',
            'reference_id': case_ref,
            'exchange': exch,
            'compliance_email': compliance_email,
            'notice_text': notice_text
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
