# CHAKRAVYUH — Real-Time Crypto Fraud Attribution System

A Smart India Hackathon project (Problem ID **26183**) for cybercrime investigators to trace suspect crypto wallets, identify known exchange endpoints, and generate legal freeze notices.

The repository contains:
- A **Flask backend API** for wallet tracing and notice generation
- A **React + Vite dashboard** (`fraud-dashboard/`) for investigator workflows
- A **standalone static demo** (`index.html` / `preview.html`) that runs directly in the browser

## What it does

- Traces outgoing wallet transactions with a BFS-based multi-hop search (up to 2 hops in backend API)
- Matches destination wallets against a curated exchange/VASP registry
- Supports single-wallet and batch CSV investigation flows
- Returns attribution metrics (found/unattributed counts, ETH/USD totals, exchange breakdown)
- Generates a Section 91 Cr.P.C / Section 94 BNSS notice draft for attributed cases
- Includes demo/fallback datasets so the UI can still demonstrate flows when live APIs are unavailable

## Tech stack

### Backend
- Python 3
- Flask + Flask-CORS
- Requests
- python-dotenv
- Pandas
- Gunicorn (deployment)
- Pytest (tests)

### Frontend
- React
- Vite
- Tailwind CSS (via `@tailwindcss/vite`)
- Axios
- Recharts
- Lucide React
- Oxlint

## Project structure

```text
.
├── app/
│   ├── models/exchanges.py            # Known exchange/VASP registry + network detection
│   ├── routes/trace.py                # API endpoints
│   └── services/
│       ├── blockchain_tracer.py       # BFS tracing logic + USD estimation
│       └── etherscan_client.py        # Live API fetch + mock fallback transactions
├── data/sample_wallets.csv            # Sample batch input
├── tests/
│   ├── test_tracer.py                 # Unit/API tests
│   └── verify_batch.py                # Batch endpoint verification script
├── fraud-dashboard/                   # React dashboard
├── API.md                             # Detailed endpoint examples
├── main.py                            # Flask entrypoint
├── Procfile                           # gunicorn startup command
├── index.html                         # Standalone static demo
└── preview.html                       # Standalone static demo backup
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

## Setup

### 1) Backend setup

```bash
cd /home/runner/work/SIH26183/SIH26183
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Then edit `.env` with your own keys (do **not** commit real keys).

### 2) Frontend setup

```bash
cd /home/runner/work/SIH26183/SIH26183/fraud-dashboard
npm install
```

## Environment variables

Backend (`.env`, from `.env.example`):

| Variable | Required | Purpose |
|---|---|---|
| `ETHERSCAN_API_KEY` | Optional | Etherscan V2 API access for live EVM tracing |
| `POLYGONSCAN_API_KEY` | Optional | Polygon API key (falls back to `ETHERSCAN_API_KEY` in code if unset) |
| `TRONGRID_API_KEY` | Optional | TronGrid API access for TRC-20 fetches |
| `PORT` | Optional | Backend port (default `5000`) |
| `FLASK_DEBUG` | Optional | Flask debug mode toggle |

Frontend (`fraud-dashboard/.env` if needed):

| Variable | Required | Purpose |
|---|---|---|
| `VITE_BACKEND_URL` | Optional | Base URL for backend API. If unset, requests use relative paths |

## Run locally

### Start backend

```bash
cd /home/runner/work/SIH26183/SIH26183
python main.py
```

Backend default URL: `http://127.0.0.1:5000`

### Start frontend dashboard

```bash
cd /home/runner/work/SIH26183/SIH26183/fraud-dashboard
npm run dev
```

### Standalone demo mode

Open either file directly in a browser:
- `/home/runner/work/SIH26183/SIH26183/index.html`
- `/home/runner/work/SIH26183/SIH26183/preview.html`

## API quick reference

- `GET /health`
- `GET /api/exchanges`
- `POST /api/trace`
- `POST /api/batch-trace`
- `POST /api/generate-notice`

For full request/response samples, see [`API.md`](./API.md).

## Testing

From repository root:

```bash
python -m pytest tests/test_tracer.py -v
python tests/verify_batch.py
```

## Deployment options present in this repo

### Backend
- `Procfile` is configured for Gunicorn:
  - `web: gunicorn main:app`
- Suitable for platforms like Render/Heroku-style process deployment.

### Static Pages
- `.github/workflows/pages.yml` deploys the repository root to **GitHub Pages** on pushes to `main`.
- This workflow publishes static files (such as `index.html` / `preview.html`).

## Known limitations (current implementation)

- Backend tracing depth is limited to 2 hops (`trace_to_exchange(..., max_hops=2)` usage in API routes).
- Address validation in backend currently accepts EVM-style addresses, Tron-style prefixes, and test addresses.
- Live tracing quality depends on third-party API availability/rate limits; mock/fallback data is used when live data is unavailable.

## Notes for contributors

- Keep secrets out of the repository (`.env` is ignored; `.env.example` is tracked).
- If you update endpoints, also update `API.md`.
