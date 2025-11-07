import React from 'react';
import './WelcomeModal.css';

function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Bem Vindo !!</h2>
        <p>Bem-vindo pela primeira vez ao nosso aplicativo!</p>
        <p>Venho aqui desejar boas-vindas a você no nosso aplicativo. Que você possa ter uma experiência incrível...</p>
        <button onClick={onClose}>Continuar</button>
      </div>
    </div>
  );
}

export default WelcomeModal;