import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./PerfilLoja.css";

const PerfilLoja = ({ nomeUsuario }) => {
  const [storeData, setStoreData] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get("http://localhost:3333/store", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.length > 0) {
          setStoreData(response.data[0]);
        } else {
          setStoreData({ name: "Minha Loja" });
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError(
            "Erro ao buscar dados da loja. Verifique os dados e tente novamente."
          );
        }
        console.error("Erro ao buscar os dados da loja:", err);
        setStoreData({ name: "Minha Loja" }); // Valor padrão
      }
    };
    fetchStoreData();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>{`Bem-vindo, ${storeData?.name || "Vendedor"}`}</h1>
      {error && <p className="text-danger">{error}</p>}
      <Container className="perfil-vendedor-container mt-5">
        <Row className="text-center">
          {storeData && (
            <Col xs={12} md={6} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Minha Loja</Card.Title>
                  <Link to="/MinhaLoja" className="btn btn-primary w-100">
                    Ver Minha Loja
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )}
         
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Meus Pedidos</Card.Title>
                <Link
                  to="/PedidosPendentesLoja"
                  className="btn btn-warning w-100"
                >
                  Ver Meus Pedidos
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Vendas Finalizadas</Card.Title>
                <Link
                  to="/PedidosFinalizadosLoja"
                  className="btn btn-info w-100"
                >
                  Ver Vendas Finalizadas
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PerfilLoja;
