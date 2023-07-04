import dotenv from 'dotenv'; // Import dotenv package
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Load environment variables in the Node.js environment
if (typeof window === 'undefined') {
  dotenv.config();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
