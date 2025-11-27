import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Pagamentos.css'; // Presumindo que o CSS para .card-options-container e .card-choice-item será adicionado aqui

import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

import logo from '../assets/Logo.png';

import {
    CreditCard,
    Wallet,
    ChevronDown,
    Barcode,
    Banknote,
} from 'lucide-react';

// --- Componente de Item de Pagamento Reutilizável ---
const PaymentItem = ({ Icon, text, selected = false, isDropdown = false, linkTo = "#", onClick, isExpanded = false }) => (
    <Link
        to={linkTo}
        className={`payment-item-link ${selected ? 'selected' : ''}`}
        onClick={onClick}
    >
        <div className="payment-icon-container">
            <Icon size={24} />
        </div>
        <span className="payment-text">{text}</span>
        {isDropdown && (
            // Rotaciona a seta se estiver expandido
            <ChevronDown size={20} className={`dropdown-arrow ${isExpanded ? 'expanded' : ''}`} />
        )}
    </Link>
);

const Pagamentos = () => {
    // Estado para o método de pagamento selecionado (pix, paypal, credito, debito, boleto, transferencia)
    const [selectedMethod, setSelectedMethod] = useState('');

    // NOVO ESTADO: Para controlar se as opções de cartão (Crédito/Débito) estão abertas
    const [isCardOptionsOpen, setIsCardOptionsOpen] = useState(false);

    // Função para tratar o clique no Cartão: abre/fecha as opções e deseleciona o método principal
    const handleCardClick = (method) => {
        // Se o método principal for 'cartao', significa que o usuário clicou para expandir/colapsar.
        // Se já estiver aberto, feche.
        if (isCardOptionsOpen) {
            setIsCardOptionsOpen(false);
            // Se o método já selecionado for crédito/débito, limpa a seleção para não haver conflito visual
            if (selectedMethod === 'credito' || selectedMethod === 'debito') {
                setSelectedMethod('');
            }
        } else {
            // Se estiver fechado, abra.
            setIsCardOptionsOpen(true);
            // O item principal 'Adicionar Cartão' NÃO é selecionado, apenas as opções internas.
            // Opcional: Aqui você pode deselecionar outros métodos principais se quiser: setSelectedMethod('');
        }
    }

    return (
        <div className="payment-container">
            {/* 1. Cabeçalho */}
            <header className="home-header">
                <img src={logo} alt="AquaFast" className="home-logo-header" />
                <div className="home-header-icons">
                    <Link to="/profile" className="header-icon-link">
                        <FaUserCircle />
                    </Link>
                    <Link to="/cart" className="header-icon-link">
                        <FaShoppingCart />
                    </Link>
                </div>
            </header>

            {/* 2. Título da Seção */}
            <div className="title-bar-blue">
                <h1>Formas de pagamento</h1>
            </div>

            <p className="subtitle-text">Selecione o método de pagamento que vai efetuar</p>

            {/* 3. LISTA DE MÉTODOS DE PAGAMENTO */}
            <section className="payment-methods-section">
                {/* Pix */}
                <PaymentItem
                    Icon={CreditCard}
                    text="Pix"
                    selected={selectedMethod === 'pix'}
                    onClick={() => { setSelectedMethod('pix'); setIsCardOptionsOpen(false); }}
                />

                {/* PayPal */}
                <PaymentItem
                    Icon={Wallet}
                    text="PayPal"
                    selected={selectedMethod === 'paypal'}
                    onClick={() => { setSelectedMethod('paypal'); setIsCardOptionsOpen(false); }}
                />

                {/* Adicionar Cartão (AGORA USA handleCardClick) */}
                <PaymentItem
                    Icon={CreditCard}
                    text="Cartão"
                    isDropdown={true}
                    // O item principal é "selecionado" se uma das opções internas estiver selecionada
                    selected={selectedMethod === 'credito' || selectedMethod === 'debito'}
                    isExpanded={isCardOptionsOpen}
                    onClick={() => handleCardClick('cartao')}
                />

                {/* NOVO: Opções de Cartão (Renderização Condicional) */}
                {isCardOptionsOpen && (
                    
                    <div className="card-options-container">
                        {/* Opção Crédito */}
                        <Link
                            to="#"
                            className={`card-choice-item ${selectedMethod === 'credito' ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod('credito')}
                        >
                            Cartão de Crédito
                        </Link>

                        {/* Opção Débito */}
                        <Link
                            to="#"
                            className={`card-choice-item ${selectedMethod === 'debito' ? 'selected' : ''}`}
                            onClick={() => setSelectedMethod('debito')}
                        >
                            Cartão de Débito
                        </Link>
                    </div>
                )}
                {/* FIM: Opções de Cartão */}

                {/* Boleto Bancário */}
                <PaymentItem
                    Icon={Barcode}
                    text="Boleto Bancário"
                    selected={selectedMethod === 'boleto'}
                    onClick={() => { setSelectedMethod('boleto'); setIsCardOptionsOpen(false); }}
                />

                {/* Transferência Bancária */}
                <PaymentItem
                    Icon={Banknote}
                    text="Transferência bancária"
                    selected={selectedMethod === 'transferencia'}
                    onClick={() => { setSelectedMethod('transferencia'); setIsCardOptionsOpen(false); }}
                />
            </section>

            {/* 4. BOTÃO DE CONFIRMAÇÃO */}
            <div className="confirm-button-wrapper">
                <button
                    className="confirm-button-blue"
                    disabled={!selectedMethod} // Desabilita se selectedMethod estiver vazio
                >
                    Confirma Compra
                </button>
            </div>


        </div>
    );
};

export default Pagamentos;