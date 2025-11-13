/*
 * Arquivo: /src/components/ExtrasModal.jsx
 * (VERSÃO CORRIGIDA - AGORA É GENÉRICO)
 */
import React, { useState, useEffect } from 'react';
import './ExtrasModal.css'; 
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';

// O "Banco de dados" de itens foi REMOVIDO DAQUI.
// Agora, os itens vêm das "props".

function ExtrasModal({ roomName, extraItems, initialQuantities, onClose, onSave }) {
  
  // Estado local para o modal
  const [quantities, setQuantities] = useState({});

  // Este useEffect garante que o estado do modal
  // seja atualizado com as quantidades da página.
  useEffect(() => {
    setQuantities(initialQuantities);
  }, [initialQuantities]);

  // Funções de controle
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

  const handleSaveAndClose = () => {
    onSave(quantities);
    onClose();
  };

  return (
    <div className="extras-modal-overlay" onClick={onClose}>
      <div className="extras-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <header className="extras-modal-header">
          {/* TÍTULO AGORA É DINÂMICO */}
          <h2>Outras Opções ({roomName})</h2>
          <button className="extras-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </header>
        
        <div className="extras-modal-body">
          <div className="item-list-modal">
            {/* AGORA MAPEIA OS ITENS RECEBIDOS VIA 'extraItems' */}
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