import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../assets/gota-caindo-07.webp';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate(); 

  // Função chamada ao enviar o formulário
  const handleRegister = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    // Apenas simula o cadastro e navega
    console.log("Usuário cadastrado! Redirecionando...");

    // Navega para /home e envia o 'state' para ativar o modal
    navigate('/home', { state: { from: 'register' } });
  };

  return (
    <div className="register-container">
      
      <div className="register-logo-container">
        <img src={logo} alt="Logo AquaFast" className="register-logo" />
      </div>

      <div className="register-form-container">
        <h2>Bem vindo!!</h2>
        
        {/* Conecta o formulário à função handleRegister */}
        <form onSubmit={handleRegister}>
          {/* --- Campo Nome Completo --- */}
          <div className="register-input-group">
            <FaUser className="register-icon" />
            <input type="text" placeholder="Nome Completo" required />
          </div>
          
          {/* --- Campo Email --- */}
          <div className="register-input-group">
            <FaEnvelope className="register-icon" />
            <input type="email" placeholder="Email" required />
          </div>
          
          {/* --- Campo Senha --- */}
          <div className="register-input-group">
            <FaLock className="register-icon" />
            <input type="password" placeholder="Senha" required />
          </div>
          
          {/* --- Campo Senha de Confirmação --- */}
          <div className="register-input-group">
            <FaLock className="register-icon" />
            <input type="password" placeholder="Senha de confirmação" required />
          </div>
          
          {/* --- Botão Cadastre --- */}
          <button type="submit" className="register-button">
            Cadastre
          </button>
        </form>
        
        {/* --- Link para Login --- */}
        <p className="register-login-link">
          Você já tem conta? <Link to="/login">Logar</Link>
        </p>
      </div>

    </div>
  );
}

export default Register;