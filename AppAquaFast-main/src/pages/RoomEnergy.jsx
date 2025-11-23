import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // OK (useParams removido)
import './RoomEnergy.css'; 
import logo from '../assets/Logo.png'; 
import { FaUserCircle, FaShoppingCart, FaArrowLeft, FaPlus, FaMinus, FaRegSnowflake, FaFire } from 'react-icons/fa';
import { PiTelevisionFill, PiLampFill, PiFanFill } from 'react-icons/pi';
import { BsSnow } from 'react-icons/bs'; 
import { MdEdit } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5'; 
import ExtrasModal from '../components/ExtrasModal.jsx';

// OK (Somente "sala")
const allRoomItems = {
  sala: [
    { id: 'tv', name: 'TV', icon: <PiTelevisionFill />, power: 200, extra: false },
    { id: 'geladeira', name: 'Geladeira', icon: <FaRegSnowflake />, power: 180, extra: false }, 
    { id: 'lampada', name: 'Lâmpada', icon: <PiLampFill />, power: 60, extra: false },
    { id: 'ar', name: 'Ar-Condicionado', icon: <BsSnow />, power: 1500, extra: false },
    { id: 'ventilador', name: 'Ventilador', icon: <PiFanFill />, power: 100, extra: true },
    { id: 'aquecedor', name: 'Aquecedor Elétrico', icon: <FaFire />, power: 2000, extra: true }, 
    { id: 'videogame', name: 'Videogames', icon: <IoGameController />, power: 150, extra: true }, 
  ],
};

// OK (Somente "sala")
const roomThresholds = {
  sala: { yellow: 500, red: 1500 },
};

function RoomEnergy() {
  const roomName = 'sala'; // OK (Valor fixo)
  const navigate = useNavigate();
  
  const mainItems = allRoomItems[roomName.toLowerCase()]?.filter(item => !item.extra) || [];
  
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
  }, [itemQuantities]); // OK (roomName removido da dependência)

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
          initialQuantities={itemQuantities}
          onClose={() => setShowExtrasModal(false)}
          onSave={handleSaveExtras}
        />
      )}

      <header className="room-energy-header">
        <img src={logo} alt="AquaFast" className="room-energy-logo-header" />
        <div className="room-energy-header-icons">
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
                    {/* ^^^ AQUI ESTAVA O ERRO ^^^ */}
                  {item.icon}
                  <span>{item.name}</span>
                  <span className="item-power">{item.power} W</span>
                </button>
                {isSelected && (
                  <div className="quantity-control-inline">
                    <button onClick={() => changeQuantity(item.id, -1)}><FaMinus /></button>
                    <input 
                      type="number" 
      _                value={quantity} 
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
        
        <h2 className="total-title">Total da Sala</h2>
        
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

export default RoomEnergy;