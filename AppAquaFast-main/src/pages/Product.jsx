import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaHome, FaComment, FaMap, FaBolt, FaClipboard } from 'react-icons/fa';

import './Product.css';

// Importação das imagens (ajuste conforme necessário)
import logo from '../assets/Logo.png';
import produtoImg from '../assets/produto-caixa.png'; // Usando a caixa como exemplo
import planoComumLogo from '../assets/plano-comum-logo.png';
import planoExtraLogo from '../assets/plano-extra-logo.png';
import planoPremiumLogo from '../assets/plano-premium-logo.png';

export default function Product() {
  // Estado apenas para simular a mudança dos pontinhos do carrossel
  const [activeDot, setActiveDot] = useState(0);

  return (
    <div className="product-page-container">

      {/* 1. Cabeçalho (Estilo Bege) */}
      <header className="product-header">
        <div className="product-header-content">
            <Link to="/">
                <img src={logo} alt="AquaFast" className="product-logo" />
            </Link>
            <div className="product-header-icons">
                <Link to="/profile" className="icon-link">
                    <FaUserCircle />
                </Link>
                <Link to="/cart" className="icon-link">
                    <FaShoppingCart />
                </Link>
            </div>
        </div>
      </header>

      {/* Conteúdo com Scroll */}
      <div className="product-scrollable-content">
          
          {/* Título do Produto (Faixa Azul) */}
          <div className="section-title-strip">
            <h1>DropVolt</h1>
          </div>

          {/* 2. Área da Foto (Carrossel) */}
          <div className="product-gallery-container">
            <div className="product-image-box">
                <span className="image-counter">1/5</span>
                <img src={produtoImg} alt="DropVolt Produto" className="main-product-img" />
            </div>
            {/* Pontinhos de navegação */}
            <div className="gallery-dots">
                {[0, 1, 2, 3].map((dot, index) => (
                    <span 
                        key={index} 
                        className={`dot ${activeDot === index ? 'active' : ''}`}
                        onClick={() => setActiveDot(index)}
                    ></span>
                ))}
            </div>
          </div>

          {/* 3. Seção Planos */}
          <div className="section-title-strip">
            <h2>Planos</h2>
          </div>

          <div className="product-plans-row">
            {/* Mini Card Plano Comum */}
            <div className="mini-plan-card">
                <div className="mini-card-top">
                    <img src={planoComumLogo} alt="Comum" />
                </div>
                <div className="mini-card-bottom">Plano Comum</div>
            </div>

            {/* Mini Card Plano Extra */}
            <div className="mini-plan-card">
                <div className="mini-card-top">
                    <img src={planoExtraLogo} alt="Extra" />
                </div>
                <div className="mini-card-bottom">Plano Extra</div>
            </div>

            {/* Mini Card Plano Premium */}
            <div className="mini-plan-card">
                <div className="mini-card-top">
                    <img src={planoPremiumLogo} alt="Premium" />
                </div>
                <div className="mini-card-bottom">Plano Premium</div>
            </div>
          </div>

          {/* 4. Sobre o Produto */}
          <div className="section-title-strip">
            <h2>Sobre o produto</h2>
          </div>

          <div className="product-description-box">
            <p>
                O DropVolt é a solução inovadora da AquaFast para monitoramento e eficiência. 
                Com tecnologia de ponta, ele garante segurança e controle total.
            </p>
            <p className="secondary-text">
                Ideal para residências e pequenos comércios. Instalação rápida e prática.
            </p>

            <div className="price-container">
                <span className="price-label">R$: ???</span>
                <span className="installments-label">Em até 12x sem juros de R$ ??</span>
            </div>
          </div>

          {/* 5. Botões de Ação */}
          <div className="product-action-buttons">
            <button className="prod-btn-buy">Compra agora</button>
            <button className="prod-btn-cart">Adicionar ao carrinho</button>
          </div>

          {/* Espaço extra para não cobrir conteúdo com o footer */}
          <div style={{ height: '80px' }}></div>
      </div>

      {/* 6. Footer de Navegação (Barra Inferior Fixa) */}
      <nav className="bottom-nav-bar">
        <Link to="/" className="nav-item active"><FaHome /></Link>
        <Link to="/chat" className="nav-item"><FaComment /></Link>
        <Link to="/map" className="nav-item"><FaMap /></Link>
        <Link to="/plans" className="nav-item"><FaBolt /></Link>
        <Link to="/orders" className="nav-item"><FaClipboard /></Link>
      </nav>

    </div>
  );
}