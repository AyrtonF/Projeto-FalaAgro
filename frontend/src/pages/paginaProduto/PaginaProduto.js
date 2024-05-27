import React from 'react';
import './PaginaProduto.css';
import { Carousel } from 'react-bootstrap';
import drone1 from '../../assets/Drone.jpg';
import drone2 from '../../assets/Drone2.jpg';
import drone3 from '../../assets/Drone3.jpg';

const PaginaProduto = () => {
    return (
        <div className="container pagina-produto-container">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <div className="produto-carousel">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={drone1}
                                    alt="Primeira Imagem"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={drone2}
                                    alt="Segunda Imagem"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={drone3}
                                    alt="Terceira Imagem"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="produto-info">
                        <h2 className="produto-nome">Nome do Produto</h2>
                        <p className="produto-descricao">Descrição do Produto</p>
                        <p className="produto-preco">Preço: $9.99</p>
                        <button className="btn btn-primary btn-adicionar-carrinho">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaProduto;
