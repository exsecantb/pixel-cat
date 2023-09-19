import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import './css/reset.css';
import './css/styles.css';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(<App />);
