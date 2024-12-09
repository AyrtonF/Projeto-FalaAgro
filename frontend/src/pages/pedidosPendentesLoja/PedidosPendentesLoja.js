import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PedidosPendentesLoja.css";

const PedidosPendentesLoja = () => {
  const { userId } = useParams();
  const [pedidos, setPedidos] = useState([]);


    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`http://localhost:3333/sale-sellerId/`);
                const pedidosData = response.data.map(pedido => ({
                    id: pedido.id,
                    status: mapStatus(pedido.status),
                    produtos: pedido.products.map(produto => produto.name),
                    valorTotal: pedido.totalValue / 100,
                    sellerConfirmed: pedido.sellerConfirmed,
                    buyerConfirmed: pedido.buyerConfirmed
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

    const handleConfirmarRecebimento = async (id) => {
        try {
            await axios.put(`http://localhost:3333/sale-seller-confirm/`, {
                saleId: id
            });
            // Atualize o estado para refletir a confirmação
            setPedidos(pedidos.map(pedido =>
                pedido.id === id ? { ...pedido, sellerConfirmed:true, status: pedido.buyerConfirmed ? 'finalizado':'pending' } : pedido
            ));
        } catch (error) {
            console.error("Erro ao confirmar o recebimento:", error);
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

    const pedidosFiltrados = pedidos.filter(pedido => pedido.status !== 'finalizado');

    if (pedidosFiltrados.length === 0) {
        return (
            <Container className="pedidos-pendentes-container">
                <Row>
                    <Col>
                        <p>Não existem pedidos pendentes.</p>
                    </Col>
                </Row>
            </Container>
        );
      }

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);

    }
  );

  return (
    <Container className="pedidos-pendentes-container">
      <Row className="justify-content-center">
        {pedidosFiltrados.map((pedido) => (
          <Col key={pedido.id} md={8} className="mb-4">
            <Card className="pedido-card">
              <Card.Body>
                <Card.Title>Pedido ID: {pedido.id}</Card.Title>
                <Card.Text className={getStatusColor(pedido.status)}>
                  Status:{" "}
                  {pedido.sellerConfirmed
                    ? "Aguardando o cliente Confirmar"
                    : "Aguardando sua Confirmação"}
                </Card.Text>
                <Card.Text>
                  Produtos:
                  <ul>
                    {pedido.produtos.map((produto, index) => (
                      <li key={index}>{produto}</li>
                    ))}
                  </ul>
                </Card.Text>
                <Card.Text>
                  Valor Total: R${pedido.valorTotal.toFixed(2)}
                </Card.Text>
                {!pedido.sellerConfirmed && (
                  <Button
                    variant="success"
                    onClick={() => handleConfirmarRecebimento(pedido.id)}
                  >
                    Confirmar Recebimento
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PedidosPendentesLoja;
