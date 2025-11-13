import React, { useState } from 'react';
import './ExtrasModal.css'; 
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { PiFanFill } from 'react-icons/pi';
import { FaFire } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';

// 1. Banco de dados dos ITENS EXTRAS
const extraItems = [
  { id: 'ventilador', name: 'Ventilador', icon: <PiFanFill />, power: 100 },
  { id: 'aquecedor', name: 'Aquecedor Elétrico', icon: <FaFire />, power: 2000 },
  { id: 'videogame', name: 'Videogames', icon: <IoGameController />, power: 150 },
  // Adicione mais itens extras aqui se precisar
];

function ExtrasModal({ initialQuantities, onClose, onSave }) {
  
  // 2. Estado local para o modal
  const [quantities, setQuantities] = useState(initialQuantities);

  // 3. Funções de controle (iguais às da página principal)
  const toggleItem = (item) => {
    setQuantities(prev => {
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
    setQuantities(prev => {
      const newQty = (prev[itemId] || 0) + amount;
      return {
        ...prev,
        [itemId]: newQty > 0 ? newQty : 1,
      };
    });
  };

  // 4. Função para salvar e fechar
  const handleSaveAndClose = () => {
    onSave(quantities); // Envia as quantidades de volta para a página
    onClose(); // Fecha o modal
  };

  return (
    <div className="extras-modal-overlay" onClick={onClose}>
      <div className="extras-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <header className="extras-modal-header">
          <h2>Outras Opções (Sala)</h2>
          <button className="extras-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </header>
        
        <div className="extras-modal-body">
          <div className="item-list-modal">
            {extraItems.map((item) => {
              const isSelected = !!quantities[item.id];
              const quantity = quantities[item.id] || 0;

              return (
                <div key={item.id} className={`item-wrapper-modal ${isSelected ? 'selected' : ''}`}>
                  <button 
                    className="item-button-modal"
                    onClick={() => toggleItem(item)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    <span className="item-power-modal">{item.power} W</span>
                  </button>
                  
                  {isSelected && (
                    <div className="quantity-control-inline-modal">
                      <button onClick={() => changeQuantity(item.id, -1)}><FaMinus /></button>
                      <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantities({...quantities, [item.id]: Number(e.target.value)})}
                      />
                      <button onClick={() => changeQuantity(item.id, +1)}><FaPlus /></button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <footer className="extras-modal-footer">
          <button className="save-button-modal" onClick={handleSaveAndClose}>
            Salvar Itens Extras
          </button>
        </footer>

      </div>
    </div>
  );
}

export default ExtrasModal;