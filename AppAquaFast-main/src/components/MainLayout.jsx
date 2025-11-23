import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import './MainLayout.css'; 

import { 
  FaHome, 
  FaMapMarkedAlt, 
  FaBolt, 
  FaCommentDots
} from 'react-icons/fa';

import { IoStatsChart } from 'react-icons/io5'; // Ícone correto para "tabela/gráfico"

function MainLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout-container">
      
      <main className="layout-content">
        <Outlet />
      </main>

      {/* A tag 'footer' é semanticamente melhor para uma barra de navegação */}
      <footer className="bottom-nav">
        {/* 1. Início */}
        <Link 
          to="/home" 
          className={isActive('/home') ? 'nav-item active' : 'nav-item'}
        >
          <FaHome />
        </Link>
        
        {/* 2. Mapa */}
        <Link 
          to="/map" 
          className={isActive('/map') ? 'nav-item active' : 'nav-item'}
        >
          <FaMapMarkedAlt />
        </Link>
        
        {/* 3. Energia */}
        <Link 
          to="/energia" // O 'to' estava '/energy' no seu, mudei para '/energia'
          className={isActive('/energia') ? 'nav-item active' : 'nav-item'}
        >
          <FaBolt />
        </Link>
        
        {/* 4. Chat */}
        <Link 
          to="/chat" 
          className={isActive('/chat') ? 'nav-item active' : 'nav-item'}
        >
          <FaCommentDots />
        </Link>
        
        {/* 5. Tabela/Gráfico (Carteira) */}
        <Link 
          to="/relatorio" // Mudei de '/wallet' para '/relatorio' para bater com o ícone
          className={isActive('/relatorio') ? 'nav-item active' : 'nav-item'}
        >
          <IoStatsChart />
        </Link>
      </footer>
    </div>
  );
}

export default MainLayout;