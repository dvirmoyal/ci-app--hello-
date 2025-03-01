from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/add', methods=['POST'])
def add():
    data = request.get_json()
    num1 = float(data.get('num1', 0))
    num2 = float(data.get('num2', 0))
    result = num1 + num2
    return jsonify({'operation': 'add', 'result': result})

@app.route('/api/subtract', methods=['POST'])
def subtract():
    data = request.get_json()
    num1 = float(data.get('num1', 0))
    num2 = float(data.get('num2', 0))
    result = num1 - num2
    return jsonify({'operation': 'subtract', 'result': result})

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)