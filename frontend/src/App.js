import React, { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [operation, setOperation] = useState('');

  const handleOperation = async (op) => {
    setError('');
    setOperation(op);

    if (!num1 || !num2) {
      setError('Please enter both numbers');
      return;
    }

    let endpoint;
    let service;

    switch (op) {
      case 'add':
      case 'subtract':
        service = 'http://localhost:5000';
        endpoint = `${service}/api/${op}`;
        break;
      case 'multiply':
      case 'divide':
        service = 'http://localhost:8080';
        endpoint = `${service}/api/${op}`;
        break;
      default:
        setError('Invalid operation');
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num1: parseFloat(num1), num2: parseFloat(num2) }),
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data.result);
        setError('');
      }
    } catch (err) {
      setError(`Failed to connect to ${op} service. Make sure both services are running.`);
      console.error('Error:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservices Calculator</h1>
        <p>Python handles Add/Subtract • Java handles Multiply/Divide</p>
      </header>
      
      <div className="calculator">
        <div className="input-group">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
          />
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>
        
        <div className="buttons">
          <button onClick={() => handleOperation('add')}>Add (+)</button>
          <button onClick={() => handleOperation('subtract')}>Subtract (-)</button>
          <button onClick={() => handleOperation('multiply')}>Multiply (×)</button>
          <button onClick={() => handleOperation('divide')}>Divide (÷)</button>
        </div>
        
        {error && <div className="error">{error}</div>}
        
        {result !== null && (
          <div className="result">
            <h2>Result: {result}</h2>
            <p className="operation-info">
              Operation: {operation} • Handled by {operation === 'add' || operation === 'subtract' ? 'Python' : 'Java'} service
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;