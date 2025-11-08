import React, { useState } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React + Serverless v3</h1>
                <p>Deployed to AWS with CloudFront & S3!!!!</p>

                <div className="counter">
                    <button onClick={() => setCount(count - 1)}>-</button>
                    <span>{count}</span>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </div>

                <p className="info">
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
            </header>
        </div>
    );
}

export default App;