import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CadastroComprador.css';

const CadastroComprador = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    cep: '',
    numberAddress: '',
    AccessName: ['Comprador']
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let verificadorNumberAddress = isNaN(  parseInt(formData.numberAddress))
      if(verificadorNumberAddress){
        setError("numberAddress em formato invalido")
        throw new Error("numberAddress em formato invalido")
      }
      formData.numberAddress = parseInt(formData.numberAddress);
      
      const response = await axios.post('http://localhost:3333/user', formData);
    
      if (response.status >= 200 && response.status <= 300) {
        // Sucesso, navegue para a tela de login ou home
        toast.success('Cadastro realizado com sucesso!');
        navigate('/login');
        
        
      }
    } catch (err) {
        
      if (err.response && err.response.data && err.response.data.error) {
        // Exibe uma mensagem de erro específica se houver uma mensagem no objeto de erro
        setError(err.response.data.error);
      }else if(err.message){
        setError(err.message);
      } else {
        // Se não, exibe uma mensagem genérica de erro
        setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
      toast.error(error);
    }
  };

  return (
    <Container className="cadastro-comprador-container position-relative">
      <Button
        variant="light"
        className="back-button"
        onClick={() => navigate('/login')}
      >
        Voltar para Login
      </Button>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Cadastro de Comprador</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu Nome"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu Email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Sua Senha"
                required
              />
            </Form.Group>

            <Form.Group controlId="formCPF">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="Seu CPF"
                required
              />
            </Form.Group>

            <Form.Group controlId="formCEP">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="Seu CEP"
                required
              />
            </Form.Group>

            <Form.Group controlId="formNumberAddress">
              <Form.Label>Número do Endereço</Form.Label>
              <Form.Control
                type="text"
                name="numberAddress"
                value={formData.numberAddress}
                onChange={handleChange}
                placeholder="Número do Endereço"
                required
              />
            </Form.Group>

            {error && <p className="error-message">{error}</p>}

            <Button variant="primary" type="submit" className="mt-3">
              Cadastrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroComprador;
