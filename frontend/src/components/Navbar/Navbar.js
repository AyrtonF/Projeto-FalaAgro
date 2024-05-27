// src/components/CustomNavbar.js
import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/logo.png';

const CustomNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAnnouncementClick = () => {
    navigate('/cadastroComprador'); // Mude para a rota apropriada para anunciar
  };

  // Defina as rotas nas quais a navbar não deve aparecer
  const hideNavbarRoutes = [
    '/compradorOuVendedor',
    '/login',
    '/cadastroVendedor',
    '/cadastroComprador'
  ];

  // Verifique se a rota atual está nas rotas onde a navbar deve ser escondida
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    !shouldHideNavbar && (
      <>
        <Navbar bg="light" expand="lg" className="custom-navbar">
          <Navbar.Brand as={NavLink} to="/">
            <img
              src={Logo}
              alt="LogofALAAGRO"
              className="navbar-brand-img"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="navbar-form">
              <Form className="d-flex" role="search">
                <FormControl
                  type="search"
                  placeholder="Buscar"
                  className="mr-2"
                  aria-label="Search"
                />
                <Button className='search-button' variant="success" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </Button>
              </Form>
            </Nav>
            <Nav className="navbar-right">
              <Nav.Link as={NavLink} to="/paginaProduto">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
              </Nav.Link>
              <Nav.Link onClick={handleLoginClick}>
                <Button variant="primary" className="btn-login">Entrar</Button>
              </Nav.Link>
              <Nav.Link onClick={handleAnnouncementClick}>
                <Button variant="secondary" className="btn-announcement">Anunciar</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Notificações</Modal.Title>
          </Modal.Header>
          <Modal.Body>Faça o Login!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Entendido!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default CustomNavbar;
