import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaUserCircle, FaShoppingCart, FaBolt } from 'react-icons/fa';

import './Product.css';

// Imagens
import logo from '../assets/Logo.png';
import planoComumLogo from '../assets/plano-comum-logo.png';
import planoExtraLogo from '../assets/plano-extra-logo.png';
import planoPremiumLogo from '../assets/plano-premium-logo.png';

export default function Product() {
    const [activeDot, setActiveDot] = useState(0);

    const plans = [
        { logo: planoComumLogo, name: 'Comum' },
        { logo: planoExtraLogo, name: 'Extra' },
        { logo: planoPremiumLogo, name: 'Premium' },
    ];

    return (
        <div className="product-page-container">

            {/* HEADER */}
            <header className="product-header">
                <div className="product-header-content">
                    <Link to="/home">
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

            {/* SCROLL CONTENT */}
            <div className="product-scrollable-content">

                {/* Título */}
                <div className="section-title-strip">
                    <h1>DropVolt</h1>
                </div>

                {/* Carrossel */}
                <div className="product-gallery-container">
                    <div className="product-image-box">
                        <span className="image-counter">1/5</span>
                        <div className="product-placeholder">
                            <FaBolt className="placeholder-icon" />
                        </div>
                    </div>
                    
                    <div className="gallery-dots">
                        {[0, 1, 2, 3, 4].map((dot, index) => (
                            <span 
                                key={index} 
                                className={`dot ${activeDot === index ? 'active' : ''}`}
                                onClick={() => setActiveDot(index)}
                            ></span>
                        ))}
                    </div>
                </div>

                {/* Planos */}
                <div className="section-title-strip">
                    <h2>Planos</h2>
                </div>
                
                <div className="product-plans-row">
                    {plans.map((plan, index) => (
                        <Link to="/planos" className="mini-plan-card" key={index}>
                            <div className="mini-card-top">
                                <img src={plan.logo} alt={plan.name} />
                            </div>
                            <div className="mini-card-bottom">{plan.name}</div>
                        </Link>
                    ))}
                </div>

                {/* Sobre */}
                <div className="section-title-strip">
                    <h2>Sobre o Produto</h2>
                </div>

                <div className="product-description-box">
                    <p>
                        O DropVolt é a solução inovadora da AquaFast para monitoramento e eficiência. 
                        Com tecnologia de ponta, ele garante segurança e controle total.
                    </p>

                    <p className="secondary-text">
                        Ideal para residências e pequenos comércios. Instalação rápida e prática.
                        <br />
                        Dica: Adquira um de nossos Planos e tenha o serviço completo.
                    </p>

                    <div className="price-container">
                        <span className="price-label">R$ 499,90</span>
                        <span className="installments-label">12x sem juros de R$ 41,66</span>
                    </div>
                </div>

                {/* Botões */}
                <div className="product-action-buttons">
                    <button className="prod-btn-buy">Comprar Agora</button>
                    <button className="prod-btn-cart">Adicionar ao Carrinho</button>
                </div>

            </div>

        </div>
    );
}
