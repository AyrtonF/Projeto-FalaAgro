import React, { createContext, useState } from "react";
import axios from "axios";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState("");
  const [sucesso, setSucesso] = useState("");

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

    const fazerPedido = async (products, storeId) => {
        try {
            const response = await axios.post('http://localhost:3333/sale', {
                products,
                storeId
            });

      if (response.status >= 200 && response.status < 300) {
        setPedido(response.data);
        setSucesso('Pedido encaminhado com sucesso, veja em "Meu Perfil".');
      }
    } catch (err) {
      if (err.response.data) {
        console.log(err.response.data);
        setError(err.response.data.error);
      } else {
        setError("Falha ao finalizar a compra.");
      }
    }
  };

  const adicionarProduto = (produto) => {
    if (carrinho.length === 0) {
      setCarrinho([{ ...produto, quantidade: 1 }]);
      setStoreId(produto.storeId);
    } else if (produto.storeId === storeId) {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    } else {
      return false; // Produto é de uma loja diferente
    }
    return true; // Produto adicionado com sucesso
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    setStoreId(null);
  };

  const editarQuantidade = (produtoId, quantidade) => {
    setCarrinho(
      carrinho.map((produto) =>
        produto.id === produtoId ? { ...produto, quantidade } : produto
      )
    );
  };

  const finalizarPedido = () => {
    if (carrinho.length === 0) return;

    const products = carrinho.map((produto) => ({
      id: produto.id,
      quantify: produto.quantidade,
    }));

    const storeId = carrinho[0].storeId;

    fazerPedido(products, storeId);
    limparCarrinho();
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        editarQuantidade,
        limparCarrinho,
        finalizarPedido,
        error,
        sucesso,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
