// src/components/CompradorOuVendedor.js
import React from 'react';
import { Button } from 'react-bootstrap';
import './CompradorOuVendedor.css';

const CompradorOuVendedor = () => {
  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-content">
        <h1>Você deseja criar seu cadastro para:</h1>
        <div className="button-group">
          <Button variant="primary">Comprar</Button>
          <Button variant="success">Vender</Button>
        </div>
      </div>
    </div>
  );
};

export default CompradorOuVendedor;
