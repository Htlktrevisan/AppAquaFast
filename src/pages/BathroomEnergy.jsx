/*
 * Arquivo: /src/pages/BathroomEnergy.jsx
 * (Página dedicada para o Banheiro)
 */
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RoomEnergy.css'; // <-- USANDO O CSS AZUL DA SALA
import logo from '../assets/Logo.png'; 
import { FaUserCircle, FaShoppingCart, FaArrowLeft, FaPlus, FaMinus, FaShower } from 'react-icons/fa';
import { PiLampFill } from 'react-icons/pi';
import { MdEdit } from 'react-icons/md';
import { GiHairDryer } from 'react-icons/gi'; // Ícone de Secador de Cabelo
import ExtrasModal from '../components/ExtrasModal.jsx';

// --- ITENS E LIMITES DO BANHEIRO ---
const allRoomItems = {
  banheiro: [
    // Itens Principais
    { id: 'chuveiro', name: 'Chuveiro Elétrico', icon: <FaShower />, power: 5500, extra: false },
    { id: 'lampada-banheiro', name: 'Lâmpada', icon: <PiLampFill />, power: 25, extra: false },
    // Itens Extras (para o modal)
    { id: 'secador-cabelo', name: 'Secador de Cabelo', icon: <GiHairDryer />, power: 1800, extra: true },
  ],
};

const roomThresholds = {
  // Limites altos por causa do chuveiro
  banheiro: { yellow: 2000, red: 5000 }, 
};
// --- FIM DOS DADOS DO BANHEIRO ---

// --- NOME DO COMPONENTE ---
function BathroomEnergy() {
  const roomName = 'banheiro'; // <-- NOME DO CÔMODO FIXO
  const navigate = useNavigate();
  
  // Separa os itens (principais e extras)
  const allItemsForThisRoom = allRoomItems[roomName.toLowerCase()] || [];
  const mainItems = allItemsForThisRoom.filter(item => !item.extra);
  const extraItemsForModal = allItemsForThisRoom.filter(item => item.extra);

  const [itemQuantities, setItemQuantities] = useState({});
  const [showExtrasModal, setShowExtrasModal] = useState(false);

  const toggleItem = (item) => {
    setItemQuantities(prev => {
      const newQ = { ...prev };
      if (newQ[item.id]) {
        delete newQ[item.id];
      } else {
        newQ[item.id] = 1;
      }
      return newQ;
    });
  };

  const changeQuantity = (itemId, amount) => {
    setItemQuantities(prev => {
      const newQty = (prev[itemId] || 0) + amount;
      return {
        ...prev,
        [itemId]: newQty > 0 ? newQty : 1, 
      };
    });
  };

  const handleSaveExtras = (extraQuantities) => {
    setItemQuantities(prev => ({
      ...prev,
      ...extraQuantities,
    }));
  };

  const { totalPower, totalQuantity } = useMemo(() => {
    let power = 0;
    let quantity = 0;
    const allItems = allRoomItems[roomName.toLowerCase()] || [];

    allItems.forEach(item => {
      const qty = itemQuantities[item.id];
      if (qty && qty > 0) {
        power += item.power * qty;
        quantity += qty;
      }
    });
    return { totalPower: power, totalQuantity: quantity };
  }, [itemQuantities]);

  const handleSave = () => {
    const roomKey = roomName.toLowerCase();
    const thresholds = roomThresholds[roomKey];
    let statusColor = 'green';
    if (totalPower >= thresholds.red) {
      statusColor = 'red';
    } else if (totalPower >= thresholds.yellow) {
      statusColor = 'yellow';
    }
    const allStatus = JSON.parse(localStorage.getItem('roomStatus')) || {};
    allStatus[roomKey] = statusColor;
    localStorage.setItem('roomStatus', JSON.stringify(allStatus));
    navigate('/energia');
  };

  const title = roomName.charAt(0).toUpperCase() + roomName.slice(1);

  return (
    <div className="room-energy-container">
      
      {showExtrasModal && (
        <ExtrasModal 
          roomName={title} // Envia "Banheiro"
          extraItems={extraItemsForModal} // Envia a lista de extras do Banheiro
          initialQuantities={itemQuantities}
          onClose={() => setShowExtrasModal(false)}
          onSave={handleSaveExtras}
        />
      )}

      <header className="room-energy-header">
        <img src={logo} alt="AquaFast" className="room-energy-logo-header" />
        <div className="energy-header-icons">
          <Link to="/profile" className="header-icon-link">
            <FaUserCircle />
          </Link>
          <Link to="/cart" className="header-icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </header>

      <div className="room-energy-content">
        <div className="room-energy-title-bar">
          <button onClick={() => navigate('/energia')} className="back-button">
            <FaArrowLeft />
          </button>
          <div className="title-text">
            <h2>Adicionar Itens - {title}</h2>
            <p>Selecionar itens e eletrônicos de sua residência</p>
          </div>
        </div>

        <div className="item-list">
          {mainItems.map((item) => {
            const isSelected = !!itemQuantities[item.id];
            const quantity = itemQuantities[item.id] || 0;
            return (
              <div key={item.id} className={`item-wrapper ${isSelected ? 'selected' : ''}`}>
                <button 
                  className="item-button"
                  onClick={() => toggleItem(item)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  <span className="item-power">{item.power} W</span>
                </button>
                {isSelected && (
                  <div className="quantity-control-inline">
                    <button onClick={() => changeQuantity(item.id, -1)}><FaMinus /></button>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setItemQuantities({...itemQuantities, [item.id]: Number(e.target.value)})}
                    />
                    <button onClick={() => changeQuantity(item.id, +1)}><FaPlus /></button>
                  </div>
                )}
              </div>
            );
          })}
          
          <button className="item-button other-options" onClick={() => setShowExtrasModal(true)}>
            <MdEdit />
            <span>Outras Opções</span>
          </button>
        </div>
        
        <h2 className="total-title">Total do Banheiro</h2>
        
        <div className="power-quantity-section">
          <div className="input-field">
            <label>Potência</label> 
            <input 
              type="text" 
              value={`${totalPower} W`} 
              disabled 
            />
          </div>
          <div className="input-field">
            <label>Total Itens</label> 
            <input 
              type="text"
              value={`${totalQuantity} Itens`} 
              disabled 
            />
          </div>
        </div>

        <button className="save-button" onClick={handleSave}>
          Salvar alteração
        </button>
      </div>
    </div>
  );
}

// --- EXPORTAÇÃO CORRETA ---
export default BathroomEnergy;