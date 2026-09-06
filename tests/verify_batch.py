from app import create_app

def run_test():
    app = create_app()
    client = app.test_client()

    with open('data/sample_wallets.csv', 'rb') as f:
        response = client.post(
            '/api/batch-trace',
            data={'file': (f, 'sample_wallets.csv')},
            content_type='multipart/form-data'
        )

    print("Status Code:", response.status_code)
    data = response.get_json()
    print("Total wallets:", data['total'])
    print("Identified exchanges:", data['found'])
    print("Attribution rate:", str(data['attribution_rate']) + "%")
    print("Total ETH traced:", data['total_eth_traced'])
    print("Total USD value: $" + str(data['total_usd_traced']))
    print("Exchange breakdown:", data['exchange_breakdown'])
    for r in data['results']:
        print(f"Wallet: {r['wallet'][:14]}... -> {r['status']} -> {r.get('exchange')} (Hops: {r.get('hops')})")

if __name__ == '__main__':
    run_test()
