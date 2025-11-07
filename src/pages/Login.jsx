import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importa o useNavigate
import './Login.css';
import logo from '../assets/gota-caindo-07.webp';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

// (Removemos todas as importações do Firebase)

function Login() {
  const navigate = useNavigate(); // Hook para navegar após o login

  // Função para o login normal (Email/Senha)
  const handleEmailLogin = (e) => {
    e.preventDefault(); // Impede o recarregamento
    
    // Por enquanto, vamos só simular o login e navegar
    console.log("Simulando login e navegando para /home...");
    navigate('/home');
  };

  // Função para os botões sociais (apenas mostra um alerta por enquanto)
  const handleSocialLogin = (platform) => {
    alert(`O login com ${platform} ainda não foi implementado!`);
  };


  return (
    <div className="login-container">
      
      <div className="login-logo-container">
        <img src={logo} alt="Logo AquaFast" className="login-logo" />
      </div>

      <div className="login-form-container">
        <h2>Bem vindo de volta!</h2>
        
        {/* Adiciona o onSubmit ao formulário */}
        <form onSubmit={handleEmailLogin}>
          {/* --- Campo Email --- */}
          <div className="login-input-group">
            <input type="email" placeholder="Email" required />
          </div>
          
          {/* --- Campo Senha --- */}
          <div className="login-input-group">
            <input type="password" placeholder="Senha" required />
          </div>
          
          {/* --- Botão Login --- */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <p className="login-social-text">Ou logar com</p>

        <div className="login-social-icons">
          {/* Botões sociais agora chamam a função de alerta */}
          <div 
            className="login-social-icon" 
            id="google" 
            onClick={() => handleSocialLogin('Google')} 
          >
            <FaGoogle />
          </div>
          <div 
            className="login-social-icon" 
            id="facebook"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <FaFacebookF />
          </div>
          <div 
            className="login-social-icon" 
            id="linkedin"
            onClick={() => handleSocialLogin('LinkedIn')}
          >
            <FaLinkedinIn />
          </div>
        </div>
        
        <p className="login-register-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>

    </div>
  );
}

export default Login;