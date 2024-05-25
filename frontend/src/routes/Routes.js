// src/routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import Login from '../pages/login/Login';
import CompradorOuVendedor from '../pages/compradorOuVendedor/CompradorOuVendedor';
const Routes = () => {
  return (
    <Router>
      
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/vendedor-ou-comprador" component={CompradorOuVendedor} />
        {/* Adicione aqui outras rotas conforme necessário */}
      </Switch>
    </Router>
  );
};

export default Routes;
