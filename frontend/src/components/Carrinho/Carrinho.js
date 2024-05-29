import React, { useContext } from 'react';
import { CarrinhoContext } from '../../context/CarrinhoContext'; // Importar o contexto do carrinho
import './Carrinho.css'
const Carrinho = () => {
  const { carrinho, editarQuantidade, finalizarPedido } = useContext(CarrinhoContext);

  const handleQuantidadeChange = (produtoId, quantidade) => {
    if (quantidade >= 1) {
      editarQuantidade(produtoId, quantidade);
    }
  };

  return (
    <div>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((produto) => (
            <div key={produto.id} className="carrinho-item">
              <img src={produto.image || ''} alt={produto.name} />
              <div>
                <h4>{produto.name}</h4>
                <p>Preço: ${produto.price}</p>
                <input
                  type="number"
                  value={produto.quantidade}
                  onChange={(e) => handleQuantidadeChange(produto.id, parseInt(e.target.value))}
                />
              </div>
            </div>
          ))}
          <button onClick={finalizarPedido}>Finalizar Pedido</button>
        </>
      )}
    </div>
  );
};

export default Carrinho;
