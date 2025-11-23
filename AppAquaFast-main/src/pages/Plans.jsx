import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaChevronDown } from 'react-icons/fa';

import './Plans.css';

// Importação das imagens
import logo from '../assets/Logo.png'; 
import planoComumLogo from '../assets/plano-comum-logo.png';
import planoExtraLogo from '../assets/plano-extra-logo.png';
import planoPremiumLogo from '../assets/plano-premium-logo.png';

export default function Plans() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const plansData = [
    {
      id: 1,
      logo: planoComumLogo,
      title: "Plano Comum",
      description: "Este plano é especialmente indicado para pessoas com renda mais acessível, oferecendo qualidade e economia.",
      benefits: ["Arduino Configurado", "Instalação em dias úteis", "Relatório simples", "Garantia Mensal"]
    },
    {
      id: 2,
      logo: planoExtraLogo,
      title: "Plano Extra",
      description: "Este plano oferece benefícios exclusivos por um preço justo e competitivo.",
      benefits: ["Todos do Plano Comum", "Suporte técnico online", "Relatório detalhado", "Garantia Semestral"]
    },
    {
      id: 3,
      logo: planoPremiumLogo,
      title: "Plano Premium",
      description: "O plano mais completo, com benefícios avançados para aproveitar ao máximo.",
      benefits: ["Todos do Extra", "Manutenção e Atualização", "Relatório completo", "Garantia Anual"]
    },
  ];

  return (
    <div className="plans-page-specific-container">

      {/* 1. Cabeçalho Específico desta Página (Bege) */}
      <header className="plans-specific-header">
        <div className="plans-header-content">
            <Link to="/">
                <img src={logo} alt="AquaFast" className="plans-logo-img" />
            </Link>
            <div className="plans-header-icons">
                <Link to="/profile" className="plans-icon-link">
                    <FaUserCircle />
                </Link>
                <Link to="/cart" className="plans-icon-link">
                    <FaShoppingCart />
                </Link>
            </div>
        </div>
      </header>

      {/* 2. Conteúdo da Página */}
      <div className="plans-scroll-content">
          <div className="plans-page-title">
            <h2>Escolha o seu plano</h2>
          </div>

          {/* Lista de Planos */}
          <div className="plans-list-container">
            {plansData.map((plan) => (
              <div key={plan.id} className="single-plan-wrapper">
                
                {/* O Cartão Visual */}
                <div className="plan-visual-card">
                    
                    {/* Topo Branco */}
                    <div className="plan-card-white-top">
                        <img src={plan.logo} alt={plan.title} />
                    </div>

                    {/* Baixo Azul */}
                    <div className={`plan-card-blue-bottom ${open === plan.id ? 'active' : ''}`}>
                        <div className="blue-content-padding">
                            <h3 className="plan-card-title">{plan.title}</h3>
                            <p className="plan-card-desc">{plan.description}</p>

                            {/* Área Expansível */}
                            <div className={`plan-benefits-box ${open === plan.id ? 'open' : ''}`}>
                                <div className="benefits-inner-content">
                                    <p className="benefits-label">Ele inclui benefícios como:</p>
                                    <ul>
                                        {plan.benefits.map((benefit, idx) => (
                                            <li key={idx}>
                                                <span className="bullet-point">•</span> {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Seta Toggle */}
                            <button 
                                className={`plan-toggle-arrow ${open === plan.id ? 'rotated' : ''}`} 
                                onClick={() => toggle(plan.id)}
                            >
                                <FaChevronDown />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Botões de Ação */}
                <div className="plan-action-buttons">
                    <button className="plan-btn-buy">Compra agora</button>
                    <button className="plan-btn-cart">Adicionar ao carrinho</button>
                </div>

              </div>
            ))}
          </div>
      </div>
      
    </div>
  );
}