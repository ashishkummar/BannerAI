import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/app.css'; // Add your CSS here

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
