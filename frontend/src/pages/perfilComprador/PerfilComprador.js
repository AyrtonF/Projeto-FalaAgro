import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./PerfilComprador.css";
import axios from "axios";

const PerfilComprador = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3333/user/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        setError("Erro ao buscar o usuário");
        console.error("Erro ao buscar o usuário:", error);
      }
    };
    fetchUser();
  }, [token]);

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

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>{`Bem-vindo, ${user ? user.name : "Usuário"}`}</h1>
      {error && <p className="text-danger">{error}</p>}
      <Container className="perfil-comprador-container mt-5">
        <Row className="text-center">
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Pedidos Pendentes</Card.Title>
                <Link
                  to="/PedidosPendentesComprador"
                  className="btn btn-primary w-100"
                >
                  Ver Pedidos Pendentes
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Pedidos Finalizados</Card.Title>
                <Link
                  to="/PedidosFinalizadosComprador"
                  className="btn btn-success w-100"
                >
                  Ver Pedidos Finalizados
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Conta</Card.Title>
                <Link to="/EditarUser" className="btn btn-danger w-100">
                  Redefinir/Excluir
                </Link>
              </Card.Body>
            </Card>
          </Col>
          {user && user.store[0] && (
            <Col xs={12} md={6} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Perfil da Loja</Card.Title>
                  <Link to="/perfilLoja" className="btn btn-warning w-100">
                    Ver Perfil da Loja
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PerfilComprador;
