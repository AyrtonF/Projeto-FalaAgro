import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom'; // Importe o componente Redirect
import './PerfilVendedor.css';

const PerfilVendedor = ({ nomeUsuario }) => {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('token');

    // Se não houver token, redirecione para a página de login
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>{`Bem vindo, ${nomeUsuario || "Vendedor"}`}</h1>
            <Container className="perfil-vendedor-container mt-5">
                <Row className="text-center">
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Minha Loja</Card.Title>
                                {/* Use o Link para direcionar para a rota da loja */}
                                <Link to="/MinhaLoja" className="btn btn-primary w-100">Ver Minha Loja</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Meus Produtos</Card.Title>
                                {/* Use o Link para direcionar para a rota de produtos */}
                                <Link to="/MeusProdutos" className="btn btn-success w-100">Ver Meus Produtos</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Meus Pedidos</Card.Title>
                                <Link to="/MeusPedidos" className="btn btn-warning w-100">Ver Meus Pedidos</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Vendas Finalizadas</Card.Title>
                                <Link to="/VendasFinalizadas" className="btn btn-info w-100">Ver Vendas Finalizadas</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Editar Dados/Excluir</Card.Title>
                                <Link to="/EditarExcluirDados" className="btn btn-danger w-100">Editar/Excluir</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PerfilVendedor;
