import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Map.css';
import logo from '../assets/Logo.png';
import { FaUserCircle, FaShoppingCart, FaSearch, FaFilter, FaCheck, FaStar } from 'react-icons/fa';

import empresa1 from '../assets/1.png'; 
import empresa2 from '../assets/2.png';
import empresa3 from '../assets/3.png';
import empresa4 from '../assets/4.png';
import empresa5 from '../assets/5.png';

// Dados expandidos das agências de Florianópolis
const agenciasData = [
  {
    id: 1,
    nome: 'Manoel Petronilho da Silveira',
    endereco: 'R. Manoel Petronilho da Silveira - São João do Rio Vermelho',
    bairro: 'Rio Vermelho',
    distancia: 2.5,
    avaliacao: 4.8,
    recomendacoes: 245,
    imagem: empresa1,
  },
  {
    id: 2,
    nome: 'Armando Calil Bulos',
    endereco: 'Rod. Armando Calil Bulos, 3300',
    bairro: 'Cachoeira do Bom Jesus',
    distancia: 8.3,
    avaliacao: 4.6,
    recomendacoes: 198,
    imagem: empresa2,
  },
  {
    id: 3,
    nome: 'Maria Villac',
    endereco: 'R. Me. Maria Villac, 1250 - Carvoeira',
    bairro: 'Carvoeira',
    distancia: 5.7,
    avaliacao: 4.9,
    recomendacoes: 312,
    imagem: empresa3,
  },
  {
    id: 4,
    nome: 'Rio Branco',
    endereco: 'Av. Rio Branco, 404 - Centro',
    bairro: 'Centro',
    distancia: 1.2,
    avaliacao: 4.7,
    recomendacoes: 289,
    imagem: empresa4,
  },
  {
    id: 5,
    nome: 'Canasvieiras',
    endereco: 'R. das Gaivotas, 1150 - Canasvieiras',
    bairro: 'Canasvieiras',
    distancia: 12.4,
    avaliacao: 4.5,
    recomendacoes: 176,
    imagem: empresa5,
  },
  {
    id: 6,
    nome: 'Lagoa da Conceição',
    endereco: 'Av. das Rendeiras, 890 - Lagoa da Conceição',
    bairro: 'Lagoa',
    distancia: 6.8,
    avaliacao: 4.9,
    recomendacoes: 334,
    imagem: empresa1,
  },
  {
    id: 7,
    nome: 'Trindade',
    endereco: 'R. Lauro Linhares, 2123 - Trindade',
    bairro: 'Trindade',
    distancia: 3.9,
    avaliacao: 4.6,
    recomendacoes: 267,
    imagem: empresa2,
  },
  {
    id: 8,
    nome: 'Beira-Mar',
    endereco: 'Av. Beira-Mar Norte, 2566',
    bairro: 'Centro',
    distancia: 1.8,
    avaliacao: 4.8,
    recomendacoes: 298,
    imagem: empresa3,
  },
  {
    id: 9,
    nome: 'Ingleses',
    endereco: 'R. Dom João Becker, 2340 - Ingleses',
    bairro: 'Ingleses',
    distancia: 15.2,
    avaliacao: 4.4,
    recomendacoes: 143,
    imagem: empresa4,
  },
  {
    id: 10,
    nome: 'Campeche',
    endereco: 'Av. Pequeno Príncipe, 1890 - Campeche',
    bairro: 'Campeche',
    distancia: 9.5,
    avaliacao: 4.7,
    recomendacoes: 221,
    imagem: empresa5,
  },
  {
    id: 11,
    nome: 'Santo Antônio de Lisboa',
    endereco: 'R. Baldicero Filomeno, 567 - Santo Antônio',
    bairro: 'Santo Antônio',
    distancia: 11.3,
    avaliacao: 4.5,
    recomendacoes: 189,
    imagem: empresa1,
  },
  {
    id: 12,
    nome: 'Kobrasol',
    endereco: 'Av. Santos Saraiva, 1234 - Kobrasol',
    bairro: 'Kobrasol',
    distancia: 7.1,
    avaliacao: 4.6,
    recomendacoes: 203,
    imagem: empresa2,
  },
];

function Map() {
  const [searchText, setSearchText] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('proximas');
  const [visibleCount, setVisibleCount] = useState(5);

  // Filtra e ordena as agências
  const filteredAgencies = useMemo(() => {
    let result = [...agenciasData];

    // Busca por texto
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      result = result.filter(
        (ag) =>
          ag.bairro.toLowerCase().includes(search) ||
          ag.endereco.toLowerCase().includes(search) ||
          ag.nome.toLowerCase().includes(search)
      );
    }

    // Ordenação
    if (selectedFilter === 'proximas') {
      result.sort((a, b) => a.distancia - b.distancia);
    } else if (selectedFilter === 'avaliadas') {
      result.sort((a, b) => b.avaliacao - a.avaliacao);
    } else if (selectedFilter === 'recomendadas') {
      result.sort((a, b) => b.recomendacoes - a.recomendacoes);
    }

    return result;
  }, [searchText, selectedFilter]);

  const visibleAgencies = filteredAgencies.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAgencies.length;

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilterMenu(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, filteredAgencies.length));
  };

  return (
    <div className="map-container">
      
      {/* HEADER */}
      <header className="map-header">
        <Link to="/home">
          <img src={logo} alt="AquaFast" className="map-logo" />
        </Link>
        <div className="map-header-icons">
          <Link to="/profile" className="header-icon-link">
            <FaUserCircle />
          </Link>
          <Link to="/cart" className="header-icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="map-content">
        
        {/* Título Azul */}
        <div className="map-title-bubble">
          <p>Agências mais próximas de você em Florianópolis</p>
        </div>

        {/* Barra de Busca */}
        <div className="map-search-container">
          <input
            type="text"
            placeholder="Digite o bairro, CEP ou cidade"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="map-search-input"
          />
          <button className="map-search-button">
            <FaSearch />
          </button>
        </div>

        {/* Resultados e Filtro */}
        <div className="map-results-header">
          <span className="map-results-count">
            {filteredAgencies.length} {filteredAgencies.length === 1 ? 'unidade encontrada' : 'unidades encontradas'}
          </span>
          
          <div className="map-filter-container">
            <button 
              className="map-filter-button"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <FaFilter /> Filtrar
            </button>

            {/* Menu de Filtro */}
            {showFilterMenu && (
              <div className="filter-dropdown">
                <button
                  className={`filter-option ${selectedFilter === 'proximas' ? 'active' : ''}`}
                  onClick={() => handleFilterSelect('proximas')}
                >
                  {selectedFilter === 'proximas' && <FaCheck />}
                  Mais próximas
                </button>
                <button
                  className={`filter-option ${selectedFilter === 'avaliadas' ? 'active' : ''}`}
                  onClick={() => handleFilterSelect('avaliadas')}
                >
                  {selectedFilter === 'avaliadas' && <FaCheck />}
                  Mais avaliadas
                </button>
                <button
                  className={`filter-option ${selectedFilter === 'recomendadas' ? 'active' : ''}`}
                  onClick={() => handleFilterSelect('recomendadas')}
                >
                  {selectedFilter === 'recomendadas' && <FaCheck />}
                  Mais recomendadas
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Lista de Agências */}
        <div className="map-agencies-list">
          {visibleAgencies.map((agencia) => (
            <div key={agencia.id} className="agency-card">
              <div className="agency-image-container">
                <img src={agencia.imagem} alt={agencia.nome} className="agency-image" />
              </div>
              <div className="agency-info">
                <div className="agency-header">
                  <h3 className="agency-name">{agencia.nome}</h3>
                  <div className="agency-rating">
                    <FaStar className="star-icon" />
                    <span>{agencia.avaliacao}</span>
                  </div>
                </div>
                <p className="agency-address">{agencia.endereco}</p>
                <div className="agency-details">
                  <span>📍 {agencia.distancia} km</span>
                  <span>👍 {agencia.recomendacoes} recomendações</span>
                </div>
                <button className="agency-location-button">Ver localização</button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Mais */}
        {hasMore && (
          <button className="map-see-more-button" onClick={handleLoadMore}>
            Ver mais ({filteredAgencies.length - visibleCount} restantes)
          </button>
        )}

        {!hasMore && filteredAgencies.length > 5 && (
          <div className="map-all-loaded">
            ✅ Todas as agências foram carregadas
          </div>
        )}

      </div>
    </div>
  );
}

export default Map;