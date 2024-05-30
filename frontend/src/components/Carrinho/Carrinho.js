import React, { useContext } from 'react';
import { CarrinhoContext } from '../../context/CarrinhoContext'; // Importar o contexto do carrinho
import './Carrinho.css';

const Carrinho = () => {
  const { carrinho, editarQuantidade, finalizarPedido } = useContext(CarrinhoContext);

  // Função para agrupar itens duplicados no carrinho
  const agruparItensDuplicados = (carrinho) => {
    const mapa = new Map();
    carrinho.forEach((produto) => {
      if (mapa.has(produto.id)) {
        mapa.set(produto.id, { ...produto, quantidade: mapa.get(produto.id).quantidade + 1 });
      } else {
        mapa.set(produto.id, { ...produto, quantidade: 1 });
      }
    });
    return Array.from(mapa.values());
  };

  // Função para lidar com a mudança de quantidade de um produto
  const handleQuantidadeChange = (produtoId, quantidade) => {
    if (quantidade >= 1) {
      editarQuantidade(produtoId, quantidade);
    }
  };

  // Agrupar itens duplicados
  const carrinhoAgrupado = agruparItensDuplicados(carrinho);

  return (
    <div>
      {carrinhoAgrupado.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinhoAgrupado.map((produto) => (
            <div key={produto.id} className="carrinho-item">
              {/* Removi a exibição da imagem, conforme solicitado */}
              <div>
                <h4>{produto.name}</h4>
                <p>Preço: ${produto.price}</p>
                {/* Exibir apenas uma entrada para o mesmo produto com quantidade 2 */}
                {produto.quantidade === 2 && <p>Quantidade: {produto.quantidade}</p>}
                {produto.quantidade !== 2 && (
                  <input
                    type="number"
                    value={produto.quantidade}
                    onChange={(e) => handleQuantidadeChange(produto.id, parseInt(e.target.value))}
                  />
                )}
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
