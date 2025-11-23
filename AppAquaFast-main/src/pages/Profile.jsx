import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; 
import logo from '../assets/Logo.png'; 
import { FaUserCircle, FaShoppingCart, FaCamera } from 'react-icons/fa';

function Profile() {
  
  const handleConfirm = (e) => {
    e.preventDefault();
    alert('Alterações salvas!');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <img src={logo} alt="AquaFast" className="profile-logo-header" />
        <div className="profile-header-icons">

          {/* AQUI ESTÁ A MUDANÇA: Adicionamos a classe 'active-blue' */}
          <Link to="/profile" className="header-icon-link active-blue">
            <FaUserCircle />
          </Link>

          <Link to="/cart" className="header-icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </header>

      <div className="profile-content">
        <div className="profile-pic-wrapper">
          <div className="profile-pic-placeholder">
            <FaUserCircle /> 
          </div>
          <button className="profile-pic-button">
            <FaCamera /> Adicionar foto de perfil
          </button>
        </div>

        <form className="profile-form" onSubmit={handleConfirm}>
          <div className="profile-section">
            <h3>DADOS PESSOAIS</h3>
            <input type="text" placeholder="Nome Completo" />
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Senha de Confirmação" />
            <input type="text" placeholder="CPF" />
          </div>

          <div className="profile-section">
            <h3>ENDEREÇO</h3>
            <input type="tel" placeholder="Telefone" />
            <div className="profile-input-row">
              <input type="text" placeholder="Cidade" className="input-city" />
              <input type="text" placeholder="CEP" className="input-cep" />
            </div>
            <input type="text" placeholder="Estado" />
          </div>

          <button type="submit" className="profile-confirm-button">
            Confirmar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;