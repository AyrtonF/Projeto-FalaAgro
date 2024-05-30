import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom'; // Importe o componente Redirect
import './PerfilComprador.css';

const PerfilComprador = ({ nomeUsuario }) => {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('token');

    // Se não houver token, redirecione para a página de login
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>{`Bem vindo, ${nomeUsuario || "Usuario"}`}</h1>
            <Container className="perfil-comprador-container mt-5">
                <Row className="text-center">
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Pedidos Pendentes</Card.Title>
                                {/* Use o Link para direcionar para a rota de pedidos pendentes */}
                                <Link to="/PedidosPendentesComprador" className="btn btn-primary w-100">Ver Pedidos Pendentes</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Pedidos Finalizados</Card.Title>
                                {/* Use o Link para direcionar para a rota de pedidos finalizados */}
                                <Link to="/PedidosFinalizadosComprador" className="btn btn-success w-100">Ver Pedidos Finalizados</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Upgrade para Vendedor</Card.Title>
                                <Link to="/FazerUpgradeVendedor" className="btn btn-warning w-100">Fazer Upgrade</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} lg={3} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>Conta</Card.Title>
                                <Link to="/RedefinirExcluirConta" className="btn btn-danger w-100">Redefinir/Excluir</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PerfilComprador;
