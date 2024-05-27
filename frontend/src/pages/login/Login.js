import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../../assets/FalaAgroLogo.png';
import banner from '../../assets/BannerFalaAgro2.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/sign-in', {
        email,
        password
      });

      if (response.status === 200) {
        
        localStorage.setItem("token",response.data.token)
        navigate('/home');
      }
    } catch (err) {
      // Trate o erro aqui, por exemplo, mostrando uma mensagem ao usuário
      console.log(err.message)
      setError('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleRegister = () => {
    navigate('/compradorOuVendedor');
  };

  return (
    <div className="form-wrapper">
      <div className="form-side">
        <a href="/" title="Logo">
          <img src={logo} className="logo" alt="FalaAgro" />
        </a>
        <form className="my-form" onSubmit={handleLogin}>
          <div className="mensagem-boas-vinda">
            <h1>Entre na sua conta</h1>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="text-field">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
              </svg>
            </label>
          </div>
          <div className="text-field">
            <label htmlFor="senha">
              Senha:
              <input
                id="senha"
                type="password"
                name="password"
                placeholder="Sua senha:"
                title="Minimo 6 caracteres e pelo menos 1 letra do alfabeto e 1 número"
              
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
              </svg>
            </label>
          </div>
          <button type="submit" className="my-form__button">
            Entrar
          </button>
          <div className="my-form__actions">
            <button
              type="button"
              className="my-form__button--register"
              onClick={handleRegister}
            >
              Quero me Cadastrar
            </button>
          </div>
        </form>
      </div>
      <div className="info-side">
        <img src={banner} alt="Banner" className="mockup" />
      </div>
    </div>
  );
};

export default Login;
