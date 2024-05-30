import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './PerfilComprador.css';

const PerfilComprador = ({nomeUsuario}) => {
    return (
        <div>
            <h1>{`Bem vindo, ${nomeUsuario || "Usuario"}`}</h1>
        <Container className="perfil-comprador-container mt-5">
            <Row className="text-center">
                <Col xs={12} md={6} lg={3} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Pedidos Pendentes</Card.Title>
                            <Button variant="primary" className="w-100">Ver Pedidos Pendentes</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Pedidos Finalizados</Card.Title>
                            <Button variant="success" className="w-100">Ver Pedidos Finalizados</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Upgrade para Vendedor</Card.Title>
                            <Button variant="warning" className="w-100">Fazer Upgrade</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title>Conta</Card.Title>
                            <Button variant="danger" className="w-100">Redefinir/Excluir</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default PerfilComprador;
