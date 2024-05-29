import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CarrinhoProvider  } from './context/CarrinhoContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarrinhoProvider>
    <App />
  </CarrinhoProvider>
  </React.StrictMode>
);


reportWebVitals();
