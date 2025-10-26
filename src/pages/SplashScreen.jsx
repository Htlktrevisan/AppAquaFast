import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-aquafast.png'; // Importa sua logo
import './SplashScreen.css'; // Vamos criar este CSS para a animação

function SplashScreen() {
  // O 'navigate' é uma função que nos deixa mudar de página
  const navigate = useNavigate();

  useEffect(() => {
    // Isso aqui roda logo que a tela aparece
    const timer = setTimeout(() => {
      // Depois de 3 segundos (3000ms), ele navega para a tela de login
      navigate('/login');
    }, 3000); // 3 segundos

    // Isso é uma boa prática: limpa o timer se o usuário sair da tela
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      {/* Usamos a logo importada aqui */}
      <img src={logo} className="splash-logo" alt="Logo AquaFast" />
    </div>
  );
}

export default SplashScreen;