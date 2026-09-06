"""
Core Blockchain Tracing Engine.
Performs Breadth-First Search (BFS) graph traversal up to 2 hops forward from victim wallet
to identify recipient exchanges and VASPs.
"""

from collections import deque
from app.services.etherscan_client import get_outgoing_txs, is_valid_address
from app.models.exchanges import get_exchange_by_wallet, is_exchange_wallet

ETH_CURRENT_PRICE_USD = 2600.0  # Reference market price

def estimate_usd_value(amount_eth: float, eth_price: float = ETH_CURRENT_PRICE_USD) -> float:
    """Estimate fiat USD value of an Ethereum amount."""
    return round(float(amount_eth) * eth_price, 2)

def trace_to_exchange(wallet_address: str, max_hops: int = 2):
    """
    Given a suspect wallet address, trace outgoing transactions up to max_hops.
    Returns a list representing the traced path to the exchange, or None if no exchange reached.
    """
    if not is_valid_address(wallet_address):
        return None

    visited = set()
    # Queue stores: (current_wallet, hops_count, path_so_far)
    queue = deque([(wallet_address.lower().strip(), 0, [])])

    while queue:
        current_wallet, hops, current_path = queue.popleft()

        if current_wallet in visited or hops >= max_hops:
            continue
        visited.add(current_wallet)

        txs = get_outgoing_txs(current_wallet)
        if not txs:
            continue

        for tx in txs:
            recipient = tx.get('to', '')
            if not recipient:
                continue

            recipient = recipient.lower().strip()
            
            try:
                val_raw = int(tx.get('value', 0))
                amount_eth = round(val_raw / 1e18, 6)
            except (ValueError, TypeError):
                amount_eth = 0.0

            tx_hash = tx.get('hash', '0x' + '0' * 64)
            timestamp = tx.get('timeStamp', '')

            exchange_info = get_exchange_by_wallet(recipient)
            
            step_record = {
                'from': current_wallet,
                'to': recipient,
                'amount_eth': amount_eth,
                'amount_usd': estimate_usd_value(amount_eth),
                'hops': hops + 1,
                'tx_hash': tx_hash,
                'timestamp': timestamp,
                'exchange': exchange_info['exchange'] if exchange_info else None,
                'exchange_name': exchange_info['name'] if exchange_info else None,
                'risk_category': exchange_info.get('risk_category') if exchange_info else 'Unclassified Intermediary',
                'compliance_email': exchange_info.get('compliance_email') if exchange_info else None,
            }

            full_path = current_path + [step_record]

            if exchange_info:
                # Target VASP/Exchange identified!
                # Ensure every hop in the returned path has the destination exchange tag for convenience
                for hop_step in full_path:
                    if not hop_step['exchange']:
                        hop_step['exchange'] = exchange_info['exchange']
                        hop_step['destination_exchange'] = exchange_info['exchange']
                return full_path

            # If not yet reached exchange and remaining hops allow, continue BFS
            if hops + 1 < max_hops:
                queue.append((recipient, hops + 1, full_path))

    return None
