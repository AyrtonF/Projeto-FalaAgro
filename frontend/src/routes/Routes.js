// src/routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from '../components/Navbar/Navbar';
import AdicionarAcessoVendedor from '../pages/adicionarAcessoVendedor/AdicionarAcessoVendedor';
import Home from '../pages/home/Home';
import PerfilComprador from '../pages/perfilComprador/PerfilComprador';
import CadastroComprador from '../pages/cadastroComprador/CadastroComprador';
import Login from '../pages/login/Login';
import { CarrinhoProvider } from '../context/CarrinhoContext';
import PerfilLoja from '../pages/perfilVendedor/PerfilLoja';
import CadastroVendedor from '../pages/cadastroVendedor/CadastroVendedor';
import MinhaLoja from '../pages/minhaLoja/MinhaLoja';
import CompradorOuVendedor from '../pages/compradorOuVendedor/CompradorOuVendedor';
import PaginaProduto from '../pages/paginaProduto/PaginaProduto';
import PedidosPendentesComprador from '../pages/pedidosPendentesComprador/PedidosPendentesComprador'
import PedidosFinalizadosComprador from '../pages/pedidosFinalizadosComprador/PedidosFinalizadosComprador';
import PedidosFinalizadosLoja from '../pedidosFinalizadosLoja/PedididosFinalizadosLoja';
import PedidosPendentesLoja from '../pages/pedidosPendentesLoja/PedidosPendentesLoja';
import UpgradeVendedor from '../pages/upgradeVendedor/UpgradeVendedor';
import EditarUser from '../pages/editarUser/EditarUser';

const AppRoutes = () => {
  
  
  return (
    <CarrinhoProvider>
        <Router>
          <CustomNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adicionarAcessoVendedor" element={<AdicionarAcessoVendedor />} />
            <Route path="/home" element={<Home />} />
            <Route path="/perfilComprador" element={<PerfilComprador />} />
            <Route path="/cadastroComprador" element={<CadastroComprador />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfilLoja" element={<PerfilLoja />} />
            <Route path="/cadastroVendedor" element={<CadastroVendedor />} />
            <Route path="/minhaLoja" element={<MinhaLoja />} />
            <Route path="/compradorOuVendedor" element={<CompradorOuVendedor />} />
            <Route path="/paginaProduto/:productId" element={<PaginaProduto />} />
            <Route path="/perfilComprador/" element={<PerfilComprador />} />
            <Route path="/pedidosPendentesComprador/" element={<PedidosPendentesComprador />} />
            <Route path="/pedidosFinalizadosComprador/" element={<PedidosFinalizadosComprador />} />
            <Route path="/pedidosPendentesLoja/" element={<PedidosPendentesLoja />} />
            <Route path="/pedidosFinalizadosLoja/" element={<PedidosFinalizadosLoja />} />
            <Route path="/fazerUpgradeVendedor/" element={<UpgradeVendedor />} />
            <Route path="/editarUser/" element={<EditarUser />} />
            {/* Adicione outras rotas conforme necessário */}
          </Routes>
    </Router>
    </CarrinhoProvider>
  );
};

export default AppRoutes;
