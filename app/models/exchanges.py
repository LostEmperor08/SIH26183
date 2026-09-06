"""
Exchange and VASP (Virtual Asset Service Provider) Intelligence Registry.
Maps known exchange hot/cold wallet addresses to entity identities for fraud attribution.
Specialized for Indian Law Enforcement (I4C / FIU-IND Compliance).
"""

# Known exchange wallet directory (normalized to lowercase)
EXCHANGE_WALLETS = {
    # Test addresses from Hackathon specification
    "0xaaa": {
        "name": "Binance Hot Wallet 6",
        "exchange": "Binance",
        "jurisdiction": "International / FIU Reporting Entity",
        "fiu_registered": True,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "compliance@binance.com",
    },
    "0xbbb": {
        "name": "Kraken Cold Storage 1",
        "exchange": "Kraken",
        "jurisdiction": "United States",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "compliance@kraken.com",
    },
    "0xccc": {
        "name": "Coinbase Prime Custody",
        "exchange": "Coinbase",
        "jurisdiction": "United States",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "le-requests@coinbase.com",
    },
    "0xddd": {
        "name": "OKX Reserve Wallet",
        "exchange": "OKEx",
        "jurisdiction": "Seychelles",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 2",
        "compliance_email": "enforcement@okx.com",
    },

    # FIU-IND Registered Indian Exchanges (Critical for MHA / I4C domestic actions)
    "0xcoindcx00000000000000000000000000000001": {
        "name": "CoinDCX Hot Wallet 1",
        "exchange": "CoinDCX",
        "jurisdiction": "India (FIU-IND Reg. Entity)",
        "fiu_registered": True,
        "risk_category": "Domestic Registered VASP",
        "compliance_email": "nodal-lea@coindcx.com",
    },
    "0xwazirx000000000000000000000000000000001": {
        "name": "WazirX Primary Hot Wallet",
        "exchange": "WazirX",
        "jurisdiction": "India (FIU-IND Reg. Entity)",
        "fiu_registered": True,
        "risk_category": "Domestic Registered VASP",
        "compliance_email": "lawenforcement@wazirx.com",
    },
    "0xmudrex000000000000000000000000000000001": {
        "name": "Mudrex Custody Vault",
        "exchange": "Mudrex",
        "jurisdiction": "India (FIU-IND Reg. Entity)",
        "fiu_registered": True,
        "risk_category": "Domestic Registered VASP",
        "compliance_email": "compliance@mudrex.com",
    },
    "0xcoinswitch00000000000000000000000000001": {
        "name": "CoinSwitch Custody Hot Reserve",
        "exchange": "CoinSwitch",
        "jurisdiction": "India (FIU-IND Reg. Entity)",
        "fiu_registered": True,
        "risk_category": "Domestic Registered VASP",
        "compliance_email": "legal-lea@coinswitch.co",
    },

    # Real-world prominent exchange deposit & cold storage addresses
    "0x28c6c06298d514db089934071355e5743bf21d60": {
        "name": "Binance 14",
        "exchange": "Binance",
        "jurisdiction": "International / FIU Reporting Entity",
        "fiu_registered": True,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "compliance@binance.com",
    },
    "0x21a31ee1afc51d94c2efccaa2092ad1028285549": {
        "name": "Binance 15",
        "exchange": "Binance",
        "jurisdiction": "International / FIU Reporting Entity",
        "fiu_registered": True,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "compliance@binance.com",
    },
    "0x503828976d22510aad0201ac7ec88293211d23da": {
        "name": "Coinbase 10",
        "exchange": "Coinbase",
        "jurisdiction": "United States",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "le-requests@coinbase.com",
    },
    "0x71660c4005ba85c37ccec55d0c4493e66fe775d3": {
        "name": "Coinbase 4",
        "exchange": "Coinbase",
        "jurisdiction": "United States",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "le-requests@coinbase.com",
    },
    "0x2910543af39aba0cd09dbb2d50200b3e800a63d2": {
        "name": "Kraken 4",
        "exchange": "Kraken",
        "jurisdiction": "United States",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "compliance@kraken.com",
    },
    "0x6cc5f688a30d3790e98f5bbf9687c936df32bdf6": {
        "name": "OKX Hot Wallet 1",
        "exchange": "OKEx",
        "jurisdiction": "Seychelles",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 2",
        "compliance_email": "enforcement@okx.com",
    },
    "0xa910f92acdaf488fa6ef02174fb8620857702766": {
        "name": "Huobi 6",
        "exchange": "Huobi / HTX",
        "jurisdiction": "Seychelles",
        "fiu_registered": False,
        "risk_category": "VASP - Tier 2",
        "compliance_email": "compliance@htx.com",
    },
    "0xf977814e90da44bfa03b6295a0616a897441acec": {
        "name": "Binance 8",
        "exchange": "Binance",
        "jurisdiction": "International / FIU Reporting Entity",
        "fiu_registered": True,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "compliance@binance.com",
    },
    # Verified Polygon PoS Network Exchange Wallets
    "0xe7804c37c13166ff0b37f5ae0bb07a3aebb6e245": {
        "name": "Binance (Polygon Hot Wallet)",
        "exchange": "Binance",
        "jurisdiction": "International / FIU Reporting Entity",
        "fiu_registered": True,
        "risk_category": "VASP - Tier 1",
        "compliance_email": "compliance@binance.com",
    },
    "0x72a53cd42eb1b5055835107502f5045608c0a54f": {
        "name": "CoinDCX India (Polygon Domestic)",
        "exchange": "CoinDCX",
        "jurisdiction": "India (FIU-IND Reg. Entity)",
        "fiu_registered": True,
        "risk_category": "Domestic Registered VASP",
        "compliance_email": "nodal-lea@coindcx.com",
    },
    "0x5bdf85216ec1e38d6458c87099406d38621345fe": {
        "name": "WazirX India (Polygon Hot Wallet)",
        "exchange": "WazirX",
        "jurisdiction": "India (FIU-IND Reg. Entity)",
        "fiu_registered": True,
        "risk_category": "Domestic Registered VASP",
        "compliance_email": "lawenforcement@wazirx.com",
    },
}

def detect_blockchain_network(address: str) -> str:
    """Detect underlying blockchain network from address pattern."""
    if not isinstance(address, str):
        return "Unknown"
    addr = address.strip()
    if addr.startswith("0x"):
        return "Ethereum / EVM (ERC-20)"
    elif addr.startswith("T") and len(addr) == 34:
        return "Tron (TRC-20 USDT)"
    elif addr.startswith(("1", "3", "bc1")):
        return "Bitcoin (BTC)"
    return "EVM Compatible"

def get_exchange_by_wallet(wallet_address: str):
    """Lookup exchange information by Ethereum wallet address."""
    if not wallet_address:
        return None
    return EXCHANGE_WALLETS.get(wallet_address.lower())

def is_exchange_wallet(wallet_address: str) -> bool:
    """Check if address belongs to a known exchange/VASP."""
    if not wallet_address:
        return False
    return wallet_address.lower() in EXCHANGE_WALLETS

def get_all_exchanges():
    """Returns list of monitored exchange entities."""
    return [
        {"address": addr, **details}
        for addr, details in EXCHANGE_WALLETS.items()
    ]
