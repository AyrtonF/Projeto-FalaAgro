import React from "react";
import './Categories.css';
import { Container, Row, Col } from 'react-bootstrap';
import heavymachine from '../../assets/heavymachine.svg';
import maqLeves from '../../assets/hammer.svg';
import prodAgro from '../../assets/flower1.svg';
import vaca from '../../assets/cow_2303763.png';

function Categories() {
    return (
        <Container id="container" className="py-4 d-flex justify-content-center">
            <Row>
                <Col xs={6} sm={6} md={3} className="categorie-item">
                    <div className="container-types-img"><img src={heavymachine} alt="" className="types-img" /></div>
                    <p>Maquinário pesado</p>
                </Col>
                <Col xs={6} sm={6} md={3} className="categorie-item">
                    <div className="container-types-img"><img src={maqLeves} alt="" className="types-img" /></div>
                    <p>Maquinário leve</p>
                </Col>
                <Col xs={6} sm={6} md={3} className="categorie-item">
                    <div className="container-types-img"><img src={prodAgro} alt="" className="types-img" /></div>
                    <p>Produtos agrícolas</p>
                </Col>
                <Col xs={6} sm={6} md={3} className="categorie-item">
                    <div className="container-types-img"><img src={vaca} alt="" className="types-img" /></div>
                    <p>Animais</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Categories;
