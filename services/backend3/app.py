from flask import Flask, jsonify, request
import os
import time
import random
from datetime import datetime

app = Flask(__name__)
SERVICE_NAME = os.environ.get('SERVICE_NAME', 'Backend-3')
PORT = int(os.environ.get('PORT', 5000))

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'service': SERVICE_NAME,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/')
def home():
    return jsonify({
        'message': f'Python Flask service - {SERVICE_NAME}',
        'service': SERVICE_NAME,
        'language': 'Python',
        'framework': 'Flask',
        'timestamp': datetime.now().isoformat(),
        'request_headers': dict(request.headers)
    })

@app.route('/api')
def api():
    return jsonify({
        'service': SERVICE_NAME,
        'endpoint': '/api',
        'data': {
            'analytics': {
                'page_views': random.randint(1000, 5000),
                'unique_visitors': random.randint(100, 1000),
                'bounce_rate': round(random.uniform(0.2, 0.8), 2)
            }
        },
        'timestamp': datetime.now().isoformat()
    })

@app.route('/slow')
def slow():
    time.sleep(3)  # 3 second delay
    return jsonify({
        'service': SERVICE_NAME,
        'message': 'Python Flask slow response',
        'delay': '3 seconds',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/python-specific')
def python_specific():
    return jsonify({
        'service': SERVICE_NAME,
        'message': 'This endpoint is Python/Flask specific',
        'python_version': os.sys.version,
        'features': [
            'List comprehensions',
            'Dictionary comprehensions',
            'Lambda functions',
            'Decorators'
        ],
        'timestamp': datetime.now().isoformat()
    })

@app.route('/data')
def data():
    # Generate some sample data
    data = [{'id': i, 'value': random.randint(1, 100)} for i in range(1, 11)]
    return jsonify({
        'service': SERVICE_NAME,
        'data': data,
        'total_records': len(data),
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print(f'{SERVICE_NAME} starting on port {PORT}')
    app.run(host='0.0.0.0', port=PORT, debug=True)