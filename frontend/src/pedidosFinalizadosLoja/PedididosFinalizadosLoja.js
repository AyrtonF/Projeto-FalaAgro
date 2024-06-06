import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PedidosFinalizadosLoja.css';

const PedidosFinalizadosLoja = () => {
    const { userId } = useParams();
    const [pedidos, setPedidos] = useState([]);

    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`http://localhost:3333/sale-sellerId/`);
                const pedidosData = response.data.map(pedido => ({
                    id: pedido.id,
                    status: mapStatus(pedido.status),
                    produtos: pedido.products.map(produto => produto.name),
                    valorTotal: pedido.totalValue / 100,
                }));
                setPedidos(pedidosData);
            } catch (error) {
                console.error("Erro ao buscar os pedidos:", error);
            }
        };
        fetchPedidos();
    }, [userId]);

    const mapStatus = (status) => {
        switch (status) {
            case 'pending':
                return 'aguardando loja';
            case 'completed':
                return 'finalizado';
            case 'canceled':
                return 'cancelado';
            default:
                return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'aguardando loja':
                return 'status-aguardando-loja';
            case 'esperando sua confirmação':
                return 'status-esperando-confirmacao';
            case 'finalizado':
                return 'status-finalizado';
            case 'cancelado':
                return 'status-cancelado';
            default:
                return '';
        }
    };

    const pedidosFinalizados = pedidos.filter(pedido => pedido.status === 'finalizado');

    if (pedidosFinalizados.length === 0) {
        return (
            <Container className="pedidos-finalizados-container">
                <Row>
                    <Col>
                        <p>Não existem pedidos finalizados.</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="pedidos-finalizados-container">
            <Row className="justify-content-center">
                {pedidosFinalizados.map((pedido) => (
                    <Col key={pedido.id} md={8} className="mb-4">
                        <Card className="pedido-card">
                            <Card.Body>
                                <Card.Title>Pedido ID: {pedido.id}</Card.Title>
                                <Card.Text className={getStatusColor(pedido.status)}>
                                    Status: {pedido.status}
                                </Card.Text>
                                <Card.Text>
                                    Produtos:
                                    <ul>
                                        {pedido.produtos.map((produto, index) => (
                                            <li key={index}>{produto}</li>
                                        ))}
                                    </ul>
                                </Card.Text>
                                <Card.Text>Valor Total: R${pedido.valorTotal.toFixed(2)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PedidosFinalizadosLoja;
