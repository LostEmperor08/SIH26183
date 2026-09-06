# Real-Time Crypto Fraud Attribution System - API Documentation

**Problem ID:** 26183  
**Organization:** Ministry of Home Affairs / I4C  
**Base URL:** `http://localhost:5000` (or your deployed Render URL)

---

## 1. Health Check
Checks if the backend intelligence service is reachable.

- **Endpoint:** `GET /health`
- **Response `200 OK`**:
```json
{
  "service": "Real-Time Crypto Fraud Attribution System",
  "status": "ok",
  "version": "1.0.0"
}
```

---

## 2. Single Wallet Trace
Performs automated 1 to 2-hop forward BFS tracing from a victim-reported suspect Ethereum address to identify the recipient VASP/Exchange.

- **Endpoint:** `POST /api/trace`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "wallet_address": "0x1234567890123456789012345678901234567890"
}
```

- **Response `200 OK` (Exchange Identified):**
```json
{
  "amount_eth": 2.45,
  "amount_usd": 6370.0,
  "compliance_email": "compliance@binance.com",
  "exchange": "Binance",
  "exchange_name": "Binance 14",
  "found": true,
  "hops": 1,
  "path": [
    {
      "amount_eth": 2.45,
      "amount_usd": 6370.0,
      "compliance_email": "compliance@binance.com",
      "exchange": "Binance",
      "exchange_name": "Binance 14",
      "from": "0x1234567890123456789012345678901234567890",
      "hops": 1,
      "risk_category": "VASP - Tier 1",
      "timestamp": "1725510400",
      "to": "0x28c6c06298d514db089934071355e5743bf21d60",
      "tx_hash": "0x4a9f19bca40a831e67d268297f0a9960244793f77366eb9965d1d6199cb14e21"
    }
  ],
  "status": "success",
  "wallet": "0x1234567890123456789012345678901234567890"
}
```

- **Response `404 Not Found` (No Exchange within Hop Limit):**
```json
{
  "found": false,
  "message": "No exchange destination detected within 2 hops",
  "status": "not_found",
  "wallet": "0x9999999999999999999999999999999999999999"
}
```

- **Response `400 Bad Request`:**
```json
{
  "error": "Invalid Ethereum wallet address format"
}
```

---

## 3. Batch Wallet Trace (CSV Upload)
Processes batch uploads of 50+ suspect wallet addresses reported by cyber crime portals.

- **Endpoint:** `POST /api/batch-trace`
- **Headers:** `Content-Type: multipart/form-data`
- **Body:** `file: <sample_wallets.csv>` (or `Content-Type: application/json` with `{"wallets": ["0x...", "0x..."]}`)

- **Response `200 OK`:**
```json
{
  "attribution_rate": 80.0,
  "exchange_breakdown": {
    "Binance": 1,
    "Coinbase": 1,
    "Kraken": 1,
    "OKEx": 1
  },
  "found": 4,
  "results": [
    {
      "amount_eth": 2.45,
      "amount_usd": 6370.0,
      "compliance_email": "compliance@binance.com",
      "exchange": "Binance",
      "exchange_name": "Binance 14",
      "found": true,
      "hops": 1,
      "path": [...],
      "status": "Attributed",
      "wallet": "0x1234567890123456789012345678901234567890"
    }
  ],
  "status": "success",
  "total": 5,
  "total_eth_traced": 19.27,
  "total_usd_traced": 50102.0,
  "unattributed": 1
}
```

---

## 4. Monitored Exchanges Directory
Returns the catalog of tagged exchange deposit contracts and cold wallets.

- **Endpoint:** `GET /api/exchanges`
- **Response `200 OK`:**
```json
{
  "status": "success",
  "exchanges": [
    {
      "address": "0x28c6c06298d514db089934071355e5743bf21d60",
      "compliance_email": "compliance@binance.com",
      "exchange": "Binance",
      "fiu_registered": true,
      "jurisdiction": "International / FIU Reporting Entity",
      "name": "Binance 14",
      "risk_category": "VASP - Tier 1"
    }
  ]
}
```

---

## 5. Section 91 Cr.P.C. / BNSS Freeze Notice Generator
Generates a formal legal asset preservation and freeze notice ready for dispatch to the target exchange compliance desk.

- **Endpoint:** `POST /api/generate-notice`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "wallet_address": "0x1234567890123456789012345678901234567890",
  "fir_number": "FIR-402/2026",
  "police_station": "Cyber Crime Police Station, New Delhi",
  "investigating_officer": "Insp. Vikram Singh"
}
```

- **Response `200 OK`:**
```json
{
  "status": "success",
  "exchange": "Binance",
  "compliance_email": "compliance@binance.com",
  "reference_id": "I4C-ETH-20260906-8912",
  "notice_text": "========================================================================\nCYBER CRIME INCIDENT ASSET PRESERVATION & FREEZE DIRECTIVE..."
}
```

