import pytest
from app.services.etherscan_client import is_valid_address
from app.models.exchanges import is_exchange_wallet, get_exchange_by_wallet, detect_blockchain_network
from app.services.blockchain_tracer import trace_to_exchange, estimate_usd_value
from app import create_app

def test_valid_address():
    assert is_valid_address('0xaaa')
    assert is_valid_address('0x1234567890123456789012345678901234567890')
    assert not is_valid_address('invalid')
    assert not is_valid_address('1234567890')

def test_network_detection():
    assert "Ethereum" in detect_blockchain_network("0x1234567890123456789012345678901234567890")
    assert "Tron" in detect_blockchain_network("T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb")
    assert "Bitcoin" in detect_blockchain_network("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")

def test_exchange_recognition():
    assert is_exchange_wallet('0xaaa')
    assert is_exchange_wallet('0x28c6c06298d514db089934071355e5743bf21d60')
    assert is_exchange_wallet('0xcoindcx00000000000000000000000000000001')
    assert not is_exchange_wallet('0xzzz')
    assert not is_exchange_wallet('0x9999999999999999999999999999999999999999')

def test_trace_invalid_wallet():
    result = trace_to_exchange('invalid_address')
    assert result is None

def test_exchange_mapping():
    info = get_exchange_by_wallet('0xaaa')
    assert info is not None
    assert info['exchange'] == 'Binance'

def test_single_hop_tracing():
    res = trace_to_exchange('0x1234567890123456789012345678901234567890', max_hops=2)
    assert res is not None
    assert len(res) == 1
    assert res[-1]['exchange'] == 'Binance'
    assert res[-1]['amount_eth'] == 2.45

def test_multi_hop_tracing():
    res = trace_to_exchange('0x7d8bf3a7ea0145ade82aca353ad2b57a50e94c77', max_hops=2)
    assert res is not None
    assert len(res) == 2
    assert res[-1]['exchange'] == 'Kraken'
    assert res[-1]['hops'] == 2

def test_usd_value_estimation():
    assert estimate_usd_value(2.0, 2500.0) == 5000.0

def test_flask_health_endpoint():
    app = create_app()
    client = app.test_client()
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'ok'
    assert data['fiu_ind_ready'] is True

def test_flask_single_trace_api():
    app = create_app()
    client = app.test_client()
    response = client.post('/api/trace', json={'wallet_address': '0x1234567890123456789012345678901234567890'})
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    assert data['found'] is True
    assert data['exchange'] == 'Binance'

def test_generate_notice_api():
    app = create_app()
    client = app.test_client()
    response = client.post('/api/generate-notice', json={
        'wallet_address': '0x1234567890123456789012345678901234567890',
        'fir_number': 'FIR-789/2026',
        'police_station': 'Cyber Crime Police Station, North Delhi'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'success'
    assert 'Binance' in data['exchange']
    assert 'Section 91' in data['notice_text'] or 'SECTION 91' in data['notice_text']
