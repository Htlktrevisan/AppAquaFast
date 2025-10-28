import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // 1. Importa o novo CSS

// 2. Importa a logo final (a 7ª peça da sua animação)
import logo from '../assets/gota-caindo-07.webp';

// 3. Importa os ícones do 'react-icons'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Register() {
  return (
    <div className="register-container">
      
      {/* ===== PARTE DE CIMA (LOGO) ===== */}
      <div className="register-logo-container">
        <img src={logo} alt="Logo AquaFast" className="register-logo" />
      </div>

      {/* ===== PARTE DE BAIXO (FORMULÁRIO) ===== */}
      <div className="register-form-container">
        <h2>Bem vindo!!</h2>
        
        <form>
          {/* --- Campo Nome Completo --- */}
          <div className="register-input-group">
            <FaUser className="register-icon" />
            <input type="text" placeholder="Nome Completo" />
          </div>
          
          {/* --- Campo Email --- */}
          <div className="register-input-group">
            <FaEnvelope className="register-icon" />
            <input type="email" placeholder="Email" />
          </div>
          
          {/* --- Campo Senha --- */}
          <div className="register-input-group">
            <FaLock className="register-icon" />
            <input type="password" placeholder="Senha" />
          </div>
          
          {/* --- Campo Senha de Confirmação --- */}
          <div className="register-input-group">
            <FaLock className="register-icon" />
            <input type="password" placeholder="Senha de confirmação" />
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