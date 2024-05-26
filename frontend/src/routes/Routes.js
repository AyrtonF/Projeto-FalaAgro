// src/routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from '../components/Navbar/Navbar';
import AdicionarAcessoVendedor from '../pages/adicionarAcessoVendedor/AdicionarAcessoVendedor';
import Home from '../pages/home/Home';
import PerfilComprador from '../pages/perfilComprador/PerfilComprador';
import CadastroComprador from '../pages/cadastroComprador/CadastroComprador';
import Login from '../pages/login/Login';
import PerfilVendedor from '../pages/perfilVendedor/PerfilVendedor';
import CadastroVendedor from '../pages/cadastroVendedor/CadastroVendedor';
import MinhaLoja from '../pages/minhaLoja/MinhaLoja';
import CompradorOuVendedor from '../pages/compradorOuVendedor/CompradorOuVendedor';
import PaginaProduto from '../pages/paginaProduto/PaginaProduto';

const AppRoutes = () => {

  
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/adicionarAcessoVendedor" element={<AdicionarAcessoVendedor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfilComprador" element={<PerfilComprador />} />
        <Route path="/cadastroComprador" element={<CadastroComprador />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfilVendedor" element={<PerfilVendedor />} />
        <Route path="/cadastroVendedor" element={<CadastroVendedor />} />
        <Route path="/minhaLoja" element={<MinhaLoja />} />
        <Route path="/compradorOuVendedor" element={<CompradorOuVendedor />} />
        <Route path="/paginaProduto" element={<PaginaProduto />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
