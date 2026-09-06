import os
import sys

# Ensure UTF-8 output encoding on Windows consoles
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from app import create_app

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() in ('true', '1')
    print(f"[*] Real-Time Crypto Fraud Attribution System running on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=debug)
