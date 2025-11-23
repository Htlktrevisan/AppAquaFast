import React from 'react';
import { Link } from 'react-router-dom';
import './Map.css'; // Importa o CSS da página
import logo from '../assets/Logo.png'; 
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

function Map() {
  return (
    <div className="map-page-container">
      {/* 1. Cabeçalho (Consistente com a Home/Profile) */}
      <header className="map-header">
        <img src={logo} alt="AquaFast" className="map-logo-header" />
        <div className="map-header-icons">
          <Link to="/profile" className="header-icon-link">
            <FaUserCircle />
          </Link>
          <Link to="/cart" className="header-icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </header>

      {/* 2. Conteúdo da Página (O Mapa) */}
      <div className="map-content-wrapper">
        {/* Este é o "placeholder" onde o mapa real entraria */}
        <div className="map-placeholder">
          <p>O mapa interativo será carregado aqui.</p>
          <span>(Integração com Google Maps/Leaflet)</span>
        </div>
      </div>
    </div>
  );
}

export default Map;