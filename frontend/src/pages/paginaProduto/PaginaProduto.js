import React, { useEffect, useState, useContext } from 'react';
import './PaginaProduto.css';
import { Carousel } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import lojaImg from '../../assets/Drone.jpg'; // Imagem da loja
import { CarrinhoContext } from '../../context/CarrinhoContext'; // Importar o contexto do carrinho

const PaginaProduto = () => {
    const { productId } = useParams();
    const [produto, setProduto] = useState(null);
    const [loja, setLoja] = useState(null);
    const { adicionarProduto, limparCarrinho, sucesso, error } = useContext(CarrinhoContext); // Usar o contexto do carrinho
    const navigate = useNavigate(); // Usar o hook useNavigate para redirecionar
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:3333/product/${productId}`);
                // Verifica se o produto tem tags, caso contrário, adiciona uma tag padrão
                if (response.data.tags && response.data.tags.length === 0) {
                    response.data.tags.push("Nenhuma categoria");
                }
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
            } catch (error) {
                console.error("Erro ao buscar a loja:", error);
            }
        };

        fetchProduto();
    }, [productId]);

    useEffect(() => {
        if (sucesso || error) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 9000); // Defina o tempo em milissegundos para a notificação desaparecer (neste caso, 9 segundos)
            return () => clearTimeout(timer);
        }
    }, [sucesso, error]);

    const getStatusClass = (status) => {
        if (status === 'active') return 'status-venda';
        if (status === 'inactive' || status === 'soldOut') return 'status-esgotado';
        return '';
    };

    if (!produto) {
        return <div>Carregando...</div>;
    }

    const handleAdicionarAoCarrinho = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirecionar para a página de login se não estiver logado
            navigate('/login');
        } else {
            const sucesso = adicionarProduto(produto);
            if (!sucesso) {
                if (window.confirm('O carrinho contém produtos de outra loja. Deseja substituir o carrinho com o novo produto?')) {
                    limparCarrinho();
                    adicionarProduto(produto);
                }
            }
        }
    };

    return (
        <div className="container pagina-produto-container">
            {showNotification && (
                <div className="alert alert-success" onClick={() => setShowNotification(false)}>
                    {sucesso && <span>{sucesso}</span>}
                    {error && <span>{error}</span>}
                </div>
            )}
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    
                    <div className="produto-carousel">
                        <Carousel>
                            {produto.images && produto.images.length > 0 ? (
                                produto.images.map((imagem, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={`data:image/jpeg;base64,${imagem}`}
                                            
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
                        <p className="produto-preco">Preço: ${produto.price / 10 || ""}</p>
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
