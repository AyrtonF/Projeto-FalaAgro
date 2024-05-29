import React, { useEffect, useState, useContext } from 'react';
import './PaginaProduto.css';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import lojaImg from '../../assets/Drone.jpg'; // Imagem da loja
import { CarrinhoContext } from '../../context/CarrinhoContext'; // Importar o contexto do carrinho

const PaginaProduto = () => {
    const { productId } = useParams();
    const [produto, setProduto] = useState(null);
    const [loja, setLoja] = useState(null);
    const { adicionarProduto } = useContext(CarrinhoContext); // Usar o contexto do carrinho

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:3333/product/${productId}`);
                console.log(response.data);
                if (response.data.tags && response.data.tags.length === 0) response.data.tags.push("Nenhuma categoria");
                setProduto(response.data);
                await fetchLoja(response.data.storeId);
            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
            }
        };

        const fetchLoja = async (storeId) => {
            try {
                const response = await axios.get(`http://localhost:3333/store/${storeId}`);
                setLoja(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar a loja:", error);
            }
        };

        fetchProduto();
    }, [productId]);

    const getStatusClass = (status) => {
        if (status === 'active') return 'status-venda';
        if (status === 'inactive' || status === 'soldOut') return 'status-esgotado';
        return '';
    };

    if (!produto) {
        return <div>Carregando...</div>;
    }

    const handleAdicionarAoCarrinho = () => {
        adicionarProduto(produto);
    };

    return (
        <div className="container pagina-produto-container">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <div className="produto-carousel">
                        <Carousel>
                            {produto.images && produto.images.length > 0 ? (
                                produto.images.map((imagem, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={imagem || lojaImg}
                                            alt={`Imagem ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))
                            ) : (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={lojaImg}
                                        alt="Imagem Padrão"
                                    />
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="produto-info">
                        <h2 className="produto-nome">{produto.name || ""}</h2>
                        <p className="produto-descricao">{produto.description || ""}</p>
                        <p className="produto-preco">Preço: ${produto.price || ""}</p>
                        {produto.dimensoes && <p className="produto-dimensoes"><strong>Dimensões:</strong> {produto.dimensoes}</p>}
                        <p className={`produto-status ${getStatusClass(produto.status)}`}><strong>Status:</strong> {produto.status || "Ativo"}</p>
                        <div className="produto-tags">
                            <strong>Tags:</strong> {produto.tags.map(tag => <a key={tag} href="#" className="produto-tag">{tag}</a>)}
                        </div>
                        <button className="btn btn-primary btn-adicionar-carrinho" onClick={handleAdicionarAoCarrinho}>Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
            <div className="row loja-info">
                <div className="col-md-12">
                    <div className="loja-perfil">
                        <img src={(loja && loja.imagem) ? loja.imagem : lojaImg} alt="Imagem da Loja" className="loja-imagem" />
                        <div className="loja-detalhes">
                            <h3 className="loja-nome">{loja ? loja.name : "Não Carreguei"}</h3>
                            <p className="loja-descricao">{loja ? loja.description : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaProduto;
