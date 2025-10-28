import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

// Importa todas as 7 PEÇAS da logo (com .webp)
import frame1 from '../assets/gota-caindo-01.webp';
import frame2 from '../assets/gota-caindo-02.webp';
import frame3 from '../assets/gota-caindo-03.webp';
import frame4 from '../assets/gota-caindo-04.webp';
import frame5 from '../assets/gota-caindo-05.webp';
import frame6 from '../assets/gota-caindo-06.webp';
import frame7 from '../assets/gota-caindo-07.webp'; // A peça final

// ----- Configurações (não mudam) -----
const DELAY_ENTRE_PECAS = 800;
const TEMPO_LOGO_COMPLETA = 1500;
const TOTAL_PECAS = 7;
const TEMPO_TOTAL_ANIMACAO = DELAY_ENTRE_PECAS * TOTAL_PECAS;
const TEMPO_TOTAL_SPLASH = TEMPO_TOTAL_ANIMACAO + TEMPO_LOGO_COMPLETA;
// ------------------------------------

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigationTimer = setTimeout(() => {
    navigate('/register');
    }, TEMPO_TOTAL_SPLASH); 

    return () => clearTimeout(navigationTimer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-puzzle-box">
        {/* A MUDANÇA ESTÁ AQUI:
          Esta imagem é invisível (visibility: hidden no CSS)
          mas ela OCUPA ESPAÇO e define o tamanho da caixa.
          Usamos a sua última imagem (a logo completa) para isso.
        */}
        <img src={frame7} className="splash-sizer" alt="" />

        {/* Agora, as peças da animação vão se empilhar
            em cima do espaço criado pelo "sizer" */}
        <img src={frame1} className="splash-piece" alt="Peça 1" />
        <img src={frame2} className="splash-piece" alt="Peça 2" />
        <img src={frame3} className="splash-piece" alt="Peça 3" />
        <img src={frame4} className="splash-piece" alt="Peça 4" />
        <img src={frame5} className="splash-piece" alt="Peça 5" />
        <img src={frame6} className="splash-piece" alt="Peça 6" />
        <img src={frame7} className="splash-piece" alt="Peça 7" />
      </div>
    </div>
  );
}

export default SplashScreen;