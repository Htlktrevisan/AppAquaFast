import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css'; 
import WelcomeModal from '../components/WelcomeModal'; 

// Importa as imagens
import logo from '../assets/Logo.png';
import missaoValores from '../assets/missao-valores.png'; 
import planoComumLogo from '../assets/plano-comum-logo.png';
import planoExtraLogo from '../assets/plano-extra-logo.png';
import planoPremiumLogo from '../assets/plano-premium-logo.png';
import produtoCaixa from '../assets/produto-caixa.png';
import comentarioRosto from '../assets/comentario-rosto.png';

import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

function Home() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.state?.from === 'register') {
      setShowModal(true);
    }
  }, [location.state]);

  return (
    <div className="home-container">
      {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}

      {/* 1. Cabeçalho */}
      <header className="home-header">
        <img src={logo} alt="AquaFast" className="home-logo-header" />
        <div className="home-header-icons">
          <FaUserCircle />
          <FaShoppingCart />
        </div>
      </header>

      {/* 2. Seção "Nossa Missão" (Imagem) */}
      <section className="home-section mission">
        <img src={missaoValores} alt="Nossa Missão e Valores" className="mission-image" />
      </section>

      {/* 3. Seção "Planos" */}
      <section className="home-section plans">
        {/* PLANO COMUM */}
        <div className="plan-card" id="comum">
          <div className="plan-card-top">
            <img src={planoComumLogo} alt="Plano Comum Logo" />
            <p className="plan-title">PLANO COMUM</p>
          </div>
          <div className="plan-card-bottom">
            <p>Plano Comum</p>
          </div>
        </div>

        {/* PLANO EXTRA */}
        <div className="plan-card" id="extra">
          <div className="plan-card-top">
            <img src={planoExtraLogo} alt="Plano Extra Logo" />
            <p className="plan-title">PLANO EXTRA</p>
          </div>
          <div className="plan-card-bottom">
            <p>Plano Extra</p>
          </div>
        </div>

        {/* PLANO PREMIUM */}
        <div className="plan-card" id="premium">
          <div className="plan-card-top">
            <img src={planoPremiumLogo} alt="Plano Premium Logo" />
            <p className="plan-title">PLANO PREMIUM</p>
          </div>
          <div className="plan-card-bottom">
            <p>Plano Premium</p>
          </div>
        </div>
      </section>

      {/* 4. Seção "Sobre nossos Produtos" */}
      <section className="home-section product-card">
        <img src={produtoCaixa} alt="Caixa do Produto" className="product-image" />
        <div className="card-text-content">
          <h2>Sobre os nossos Produtos</h2>
          <p>Chegou a primeira geração de soluções da AQUAFAST...</p>
          <button className="home-button-white">Ver detalhes</button>
        </div>
      </section>

      {/* 5. Seção "Comentários" (TEXTO CORRIGIDO) */}
      <section className="home-section comment-card">
        <img src={comentarioRosto} alt="Rosto de cliente" className="comment-image" />
        <div className="card-text-content">
          <h2>Comentários</h2>
          {/* Usei <br/> para quebrar a linha como na imagem */}
          <p className="comment-text-body">
            Excelente serviço e estrutura do aplicativo.<br/>
            É só apertar o play para ver mais.
          </p>
          <button className="home-button-white">Ver mais</button>
        </div>
      </section>
    </div>
  );
}

export default Home;