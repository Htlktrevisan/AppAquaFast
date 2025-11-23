/*
 * Arquivo: /src/pages/Energy.jsx
 * (CORRIGIDO para puxar as dicas do Quarto/Banheiro)
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Energy.css'; 
import logo from '../assets/Logo.png'; 
import { FaUserCircle, FaShoppingCart, FaBed, FaShower, FaCouch, FaExclamationTriangle } from 'react-icons/fa'; 
import EnergyTipsModal from '../components/EnergyTipsModal.jsx'; 

function Energy() {
  const navigate = useNavigate();
  const [roomStatus, setRoomStatus] = useState({});
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [modalRoom, setModalRoom] = useState(null); 

  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem('roomStatus')) || {};
    setRoomStatus(savedStatus);
  }, []); 

  const handleOpenTips = (e, roomName, status) => {
    e.stopPropagation(); 
    if (status === 'yellow' || status === 'red') {
      setModalRoom(roomName);
      setShowTipsModal(true);
    }
  };
  const handleCloseTips = () => {
    setShowTipsModal(false);
    setModalRoom(null);
  };

  const handleRoomClick = (roomName) => {
    navigate(`/energia/${roomName.toLowerCase()}`);
  };

  const getStatus = (roomName) => {
    return roomStatus[roomName.toLowerCase()] || 'none';
  };

  return (
    <div className="energy-page-container">
      
      {showTipsModal && (
        <EnergyTipsModal 
          room={modalRoom} 
          status={getStatus(modalRoom)} 
          onClose={handleCloseTips} 
        />
      )}

      <header className="energy-header">
        <img src={logo} alt="AquaFast" className="energy-logo-header" />
        <div className="energy-header-icons">
          <Link to="/profile" className="header-icon-link">
            <FaUserCircle />
          </Link>
          <Link to="/cart" className="header-icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </header>

      <div className="energy-content">
        <div className="energy-title-bar">
          <h2>Escolher Cômodo</h2>
          <p>Selecione qual parte de sua residência você quer saber</p>
        </div>

        <div className="room-grid">
          
          {/* --- CARD DA SALA --- */}
          <div 
            className={`room-card status-${getStatus('sala')}`} 
            onClick={() => handleRoomClick('Sala')}
          >
            {(getStatus('sala') === 'yellow' || getStatus('sala') === 'red') && (
              <button 
                className="warning-icon" 
                onClick={(e) => handleOpenTips(e, 'sala', getStatus('sala'))}
              >
                <FaExclamationTriangle />
              </button>
            )}
            <FaCouch className="room-icon" />
            <span>SALA</span>
          </div>

          {/* --- CARD DA COZINHA --- */}
          <div 
            className={`room-card status-${getStatus('cozinha')}`} 
            onClick={() => handleRoomClick('Cozinha')}
          >
            {(getStatus('cozinha') === 'yellow' || getStatus('cozinha') === 'red') && (
              <button 
                className="warning-icon" 
                onClick={(e) => handleOpenTips(e, 'cozinha', getStatus('cozinha'))}
              >
                <FaExclamationTriangle />
              </button>
            )}
            
            <svg className="room-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 10H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 5H9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>COZINHA</span>
          </div>

          {/* --- CARD DO QUARTO --- */}
          <div 
            className={`room-card status-${getStatus('quarto')}`} 
            onClick={() => handleRoomClick('Quarto')}
          >
            {(getStatus('quarto') === 'yellow' || getStatus('quarto') === 'red') && (
              <button 
                className="warning-icon" 
                // --- CORREÇÃO AQUI ---
                // Trocado de 'Quarto' para 'quarto' (minúsculo)
                onClick={(e) => handleOpenTips(e, 'quarto', getStatus('quarto'))}
              >
                <FaExclamationTriangle />
              </button>
            )}
            <FaBed className="room-icon" />
            <span>QUARTO</span>
          </div>

          {/* --- CARD DO BANHEIRO --- */}
          <div 
            className={`room-card status-${getStatus('banheiro')}`} 
            onClick={() => handleRoomClick('Banheiro')}
          >
            {(getStatus('banheiro') === 'yellow' || getStatus('banheiro') === 'red') && (
              <button 
                className="warning-icon" 
                // --- CORREÇÃO AQUI ---
                // Trocado de 'Banheiro' para 'banheiro' (minúsculo)
                onClick={(e) => handleOpenTips(e, 'banheiro', getStatus('banheiro'))}
              >
                <FaExclamationTriangle />
              </button>
            )}
            <FaShower className="room-icon" />
            <span>BANHEIRO</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Energy;