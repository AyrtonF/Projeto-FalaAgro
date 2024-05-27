// src/components/CompradorOuVendedor.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CompradorOuVendedor.css';

const CompradorOuVendedor = () => {
  const navigate = useNavigate();
  const handleCadastroCompradorClick = () => {
    navigate('/cadastroComprador');
  };
  const handleCadastroVendedorClick = () => {
    navigate('/cadastroVendedor');
  };
  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-content">
        <h1>Você deseja criar seu cadastro para:</h1>
        <div className="button-group">
          <Button variant="primary" onClick={handleCadastroCompradorClick}>Comprar</Button>
          <Button variant="success" onClick={handleCadastroVendedorClick}>Vender</Button>
        </div>
      </div>
    </div>
  );
};

export default CompradorOuVendedor;
