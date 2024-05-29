import React, { createContext, useState } from 'react';

import axios from 'axios';
export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);
   
    const [pedido,setPedido] = useState(null) 
    const [error, setError] = useState('');
    axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token');
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
      
          if (response.status === 200) {
            console.log(response.data);
          }
        } catch (err) {
          // Trate o erro aqui, por exemplo, mostrando uma mensagem ao usuário
          setError('Falha ao finalizar a compra. ');
        }
      };
    const adicionarProduto = (produto) => {
        setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    };

    const editarQuantidade = (produtoId, quantidade) => {
        setCarrinho(carrinho.map(produto =>
            produto.id === produtoId ? { ...produto, quantidade } : produto
        ));
    };

    const finalizarPedido = () => {
        // lógica para finalizar o pedido
        let products = carrinho.map((produto)=>produto.id)
        let storeId = carrinho[0].storeId
        console.log(storeId)
        
        //fazerPedido(carrinho,userId)
        setCarrinho([]);
    };

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarProduto, editarQuantidade, finalizarPedido }}>
            {children}
        </CarrinhoContext.Provider>
    );
};
