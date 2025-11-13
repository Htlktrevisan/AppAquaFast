import React from 'react';
import './EnergyTipsModal.css';
import { FaTimes, FaLightbulb } from 'react-icons/fa';

// "Banco de dados" das dicas
const tipsDatabase = {
  sala: {
    yellow: [
      "Tente reduzir o uso do Ar-Condicionado em dias mais frescos.",
      "Verifique se as lâmpadas são de LED. Elas são 80% mais econômicas.",
    ],
    red: [
      "Seu consumo está muito alto! Desligue aparelhos da tomada quando não estiver usando.",
      "Evite usar o Aquecedor Elétrico e o Ar-Condicionado ao mesmo tempo.",
      "Considere trocar aparelhos antigos por modelos com selo Procel A de eficiência.",
    ],
  },
  cozinha: {
    yellow: [
      "Evite abrir a porta da geladeira desnecessariamente.",
      "Não coloque alimentos quentes dentro da geladeira.",
    ],
    red: [
      "Fogão Elétrico e Forno Elétrico são os maiores vilões! Tente usar um de cada vez.",
      "Verifique a borracha de vedação da sua geladeira.",
    ],
  },
  
  // --- DICAS DO QUARTO ADICIONADAS ---
  quarto: {
    yellow: [
      "Desligue o computador ou coloque-o em modo de espera quando não estiver usando.",
      "Evite deixar carregadores de celular na tomada depois que a carga estiver completa.",
    ],
    red: [
      "O Ar-Condicionado do quarto é um grande consumidor. Tente usá-lo com o timer ou em uma temperatura mais amena (ex: 23°C).",
      "Luzes de LED no abajur e no teto podem economizar até 80% em iluminação.",
    ],
  },

  // --- DICAS DO BANHEIRO ADICIONADAS ---
  banheiro: {
    yellow: [
      "Tente reduzir o tempo de uso do secador de cabelo.",
      "Não deixe a luz do espelho acesa sem necessidade.",
    ],
    red: [
      "O chuveiro elétrico é o maior vilão da casa! Tente tomar banhos mais curtos.",
      "Nos dias mais quentes, mude a chave do chuveiro para a posição 'Verão' (Morno). Isso pode economizar até 30% da energia do banho.",
    ],
  },
};

function EnergyTipsModal({ room, status, onClose }) {
  // Esta lógica agora vai encontrar as dicas do "quarto" e "banheiro"
  const tips = tipsDatabase[room] ? tipsDatabase[room][status] : ["Nenhuma dica disponível."];

  return (
    <div className="modal-overlay-tips" onClick={onClose}>
      <div className="modal-content-tips" onClick={(e) => e.stopPropagation()}>
        
        <button className="modal-close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className={`modal-header-tips status-${status}`}>
          <FaLightbulb />
          <h2>Dicas de Economia ({room.charAt(0).toUpperCase() + room.slice(1)})</h2>
        </div>
        
        <div className="modal-body-tips">
          <p>Percebemos que seu consumo está <strong>{status === 'yellow' ? 'acima do ideal' : 'muito alto'}</strong>. Veja como melhorar:</p>
          
          <ul className="tips-list">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default EnergyTipsModal;