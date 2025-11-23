import React, { useState } from 'react'; // 1. Importa o useState
import { Link } from 'react-router-dom';
import './Comments.css'; 
import logo from '../assets/Logo.png'; 
import { FaUserCircle, FaShoppingCart, FaStar } from 'react-icons/fa';

// Importa as imagens que VOCÊ JÁ TEM
import ribamarImg from '../assets/ribamar.png';
import zecaImg from '../assets/zeca.png'; // Vou assumir que é zeca.png
import julioImg from '../assets/julio.png';
import periclesImg from '../assets/Pericles.png'; // 'P' maiúsculo
import carianiImg from '../assets/cariani.png'; 
import bisteconeImg from '../assets/bistecone.png'; 
import alanzoeuaImg from '../assets/alanzoeua.png'; 

// 2. Cria a lista COMPLETA de comentários
const allComments = [
  {
    id: 1,
    author: 'Ribamar',
    image: ribamarImg,
    text: 'Urrra, meu amigo, vou te falar... a AQUAFAST é uma baita brilhante. Um doce, um mel, uma delícia. Quem diria que um aplicativo ia me fazer economizar um dinheirinho. É disso que eu tô falando, é diferencial, eficiência e ajuda a deixar a conta mais suave. É isso!',
  },
  {
    id: 2,
    author: 'Zeca Pagodinho',
    image: zecaImg,
    text: 'Rapaz, botei esse tal de AquaFast aqui em casa e agora é só alegria, viu. A conta vem baixinha, até sobra pra tomar mais uma gelada kkk. Recomendo, parceiro!',
  },
  {
    id: 3,
    author: 'Júlio Cocielo',
    image: julioImg,
    text: 'Coloquei esse negócio da AquaFast aqui em casa e, juro, tô me sentindo o leão que descobriu o filtro de barro... só que da água da conta kkk. Economiza mesmo, brabo!',
  },
  {
    id: 4,
    author: 'Péricles',
    image: periclesImg,
    text: '"Opa, meu amigo, vou te falar... a AQUAFAST é uma baita brilhante. Um doce, um mel, uma delícia. Quem diria que um aplicativo ia me fazer economizar um dinheirinho. É disso que eu tô falando, é diferencial, eficiência e ajuda a deixar a conta mais suave.".',
  },
  {
    id: 5,
    author: 'Renato Cariani',
    image: carianiImg,
    text: '"Galera, a AQUAFAST é simplesmente sinônimo de gestão de energia com base em evidência. É ciência. Gestão hídrica, sinergia, funciona perfeitamente. Testa só para você ver."',
  },
  {
    id: 6,
    author: 'Bistecone',
    image: bisteconeImg,
    text: '"Instalei esse tal de AQUAFAST aqui em casa... eh, a chuva caindo molenga, e eu tomando banho quente. E o aplicativo segurando a conta pra não virar um monstro. Num guento mais pagar conta alta. Tá maluco, chefe. Dá licença, mIó."',
  },
  {
    id: 7,
    author: 'Alanzoeua',
    image: alanzoeuaImg,
    text: '"Oloco meu! Esse tal de AquaFast? O aplicativo é MUITO rápido, muito louco! O investimento desceu rasgando! "BIIIIIIIRL" A conta diminuiu. Ajuda o maluco que tá doente! É 37 anos, com carinha de 17! É hora do show, PORRA!"',
  },
];


function Comments() {
  // 3. Controla quantos comentários estão visíveis. Começa com 3.
  const [visibleComments, setVisibleComments] = useState(3); 
  const commentsToShow = allComments.slice(0, visibleComments); 

  // 4. Função para mostrar o resto
  const handleLoadMore = () => {
    setVisibleComments(allComments.length); // Mostra todos
  };

  return (
    <div className="comments-page-container">
      <header className="comments-header">
        <img src={logo} alt="AquaFast" className="comments-logo-header" />
        <div className="comments-header-icons">
          <Link to="/profile" className="header-icon-link">
            <FaUserCircle />
          </Link>
          <Link to="/cart" className="header-icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </header>

      <div className="comments-content">
        {/* ESTA É A FAIXA QUE VOCÊ PEDIU */}
        <div className="comments-title-bar">
          <h2>Comentários</h2>
        </div>

        {/* 5. Renderiza apenas os comentários visíveis */}
        <div className="comment-list">
          {commentsToShow.map((comment) => (
            <div className="comment-card-item" key={comment.id}>
              <img src={comment.image} alt={comment.author} className="comment-author-pic" />
              <div className="comment-author-info">
                <span className="comment-author-name">{comment.author}</span>
                <div className="comment-stars">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p className="comment-text">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 6. Botão "Ver mais" só aparece se houver comentários escondidos */}
        {visibleComments < allComments.length && (
          <button onClick={handleLoadMore} className="comments-load-more">
            Ver mais
          </button>
        )}
      </div>
    </div>
  );
}

export default Comments;