import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from './context/LoginContext/LoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <LoginProvider>
        <App />

    </LoginProvider>
  </React.StrictMode>
  </BrowserRouter>
);
