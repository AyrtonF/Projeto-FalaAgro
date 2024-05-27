import React from "react";
import { Carousel, Container } from 'react-bootstrap';
import './Carrossel.css';

import image1 from '../../assets/carrossel1.jpeg';
import image2 from '../../assets/carrossel2.jpg';
import image3 from '../../assets/carrossel3.jpeg';

function Carrossel() {
    const TeT = [
        {
            'id': 'cardbemvindo',
            'titulo': 'Seja bem vindo ao FalaMarket!',
            'Descricao': 'Aqui você encontra variedade e os melhores produtos Agro do mercado'
        },
        {
            'id': 'sessaomaquinas',
            'titulo': 'Confira nossa sessão de Maquinas',
            'Descricao': 'As melhores máquinas dos melhores fornecedores do nordeste de o Brasil'
        },
        {
            'id': 'façaseucadastro',
            'titulo': 'Faça seu cadastro!',
            'Descricao': 'Clique na sessão "Entrar" e venha fazer parte do maior Marketplace agro do nordeste'
        }
    ];

    return (
        <Container>
            <Carousel>
                {TeT.map((card, index) => (
                    <Carousel.Item key={card.id}>
                        <img
                            className="d-block w-100 img-carrossel"
                            src={index === 0 ? image1 : index === 1 ? image2 : image3}
                            alt={card.titulo}
                        />
                        <Carousel.Caption>
                            <h3>{card.titulo}</h3>
                            <p>{card.Descricao}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default Carrossel;
