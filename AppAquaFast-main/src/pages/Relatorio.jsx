import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Relatorio.css';
import logo from '../assets/Logo.png';
import { FaUserCircle, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Dados simulados de consumo por semana
const weeklyData = [
  {
    week: 1,
    days: [
      { day: 'Seg', energy: 12.5 },
      { day: 'Ter', energy: 15.2 },
      { day: 'Qua', energy: 11.8 },
      { day: 'Qui', energy: 18.3 },
      { day: 'Sex', energy: 14.7 },
      { day: 'Sáb', energy: 22.1 },
      { day: 'Dom', energy: 19.4 },
    ],
  },
  {
    week: 2,
    days: [
      { day: 'Seg', energy: 13.1 },
      { day: 'Ter', energy: 14.5 },
      { day: 'Qua', energy: 16.2 },
      { day: 'Qui', energy: 12.9 },
      { day: 'Sex', energy: 17.8 },
      { day: 'Sáb', energy: 25.3 },
      { day: 'Dom', energy: 21.2 },
    ],
  },
  {
    week: 3,
    days: [
      { day: 'Seg', energy: 11.2 },
      { day: 'Ter', energy: 13.8 },
      { day: 'Qua', energy: 15.1 },
      { day: 'Qui', energy: 14.3 },
      { day: 'Sex', energy: 16.9 },
      { day: 'Sáb', energy: 23.7 },
      { day: 'Dom', energy: 20.5 },
    ],
  },
  {
    week: 4,
    days: [
      { day: 'Seg', energy: 14.8 },
      { day: 'Ter', energy: 16.3 },
      { day: 'Qua', energy: 12.7 },
      { day: 'Qui', energy: 15.5 },
      { day: 'Sex', energy: 18.2 },
      { day: 'Sáb', energy: 24.9 },
      { day: 'Dom', energy: 22.6 },
    ],
  },
];

// Dados de consumo por item/cômodo
const itemConsumption = [
  { name: 'Chuveiro', value: 35, color: '#FF6B6B' },
  { name: 'Ar-Condicionado', value: 28, color: '#4ECDC4' },
  { name: 'Geladeira', value: 15, color: '#FFD93D' },
  { name: 'TV', value: 10, color: '#95E1D3' },
  { name: 'Computador', value: 7, color: '#A8E6CF' },
  { name: 'Outros', value: 5, color: '#C7CEEA' },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#A8E6CF', '#C7CEEA'];

function Relatorio() {
  const [currentWeek, setCurrentWeek] = useState(0);

  const weekData = weeklyData[currentWeek];

  const totalWeek = useMemo(() => {
    return weekData.days.reduce((sum, day) => sum + day.energy, 0);
  }, [currentWeek]);

  const avgDaily = useMemo(() => {
    return (totalWeek / 7).toFixed(1);
  }, [totalWeek]);

  const maxDay = useMemo(() => {
    return weekData.days.reduce((max, day) => day.energy > max.energy ? day : max);
  }, [currentWeek]);

  const handlePrevWeek = () => {
    if (currentWeek > 0) setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    if (currentWeek < weeklyData.length - 1) setCurrentWeek(currentWeek + 1);
  };

  return (
    <div className="relatorio-container">
      
      {/* HEADER */}
      <header className="relatorio-header">
        <Link to="/home">
          <img src={logo} alt="AquaFast" className="relatorio-logo" />
        </Link>
        <div className="relatorio-header-icons">
          <Link to="/profile" className="header-icon-link">
            <FaUserCircle />
          </Link>
          <Link to="/cart" className="header-icon-link">
            <FaShoppingCart />
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="relatorio-content">
        
        {/* Título */}
        <div className="relatorio-title-bubble">
          <h2>Relatório de Energia</h2>
          <p>Acompanhe seu consumo semanal</p>
        </div>

        {/* Cards de Resumo */}
        <div className="summary-cards">
          <div className="summary-card">
            <span className="summary-label">Total da Semana</span>
            <span className="summary-value">{totalWeek.toFixed(1)} kWh</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Média Diária</span>
            <span className="summary-value">{avgDaily} kWh</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Dia de Pico</span>
            <span className="summary-value">{maxDay.day}</span>
            <span className="summary-subvalue">{maxDay.energy} kWh</span>
          </div>
        </div>

        {/* Navegação de Semanas */}
        <div className="week-navigation">
          <button 
            onClick={handlePrevWeek} 
            disabled={currentWeek === 0}
            className="week-nav-button"
          >
            <FaChevronLeft />
          </button>
          <h3>Semana {currentWeek + 1}</h3>
          <button 
            onClick={handleNextWeek} 
            disabled={currentWeek === weeklyData.length - 1}
            className="week-nav-button"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Gráfico de Barras - Consumo Diário */}
        <div className="chart-section">
          <h3 className="chart-title">Consumo por Dia da Semana</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weekData.days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #0F7CBF', borderRadius: '8px' }}
                formatter={(value) => [`${value} kWh`, 'Consumo']}
              />
              <Bar dataKey="energy" fill="#0F7CBF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza - Consumo por Item */}
        <div className="chart-section">
          <h3 className="chart-title">Consumo por Aparelho</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={itemConsumption}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {itemConsumption.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legenda Personalizada */}
          <div className="custom-legend">
            {itemConsumption.map((item, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas de Economia */}
        <div className="tips-section">
          <h3>💡 Dica da Semana</h3>
          <p>O chuveiro elétrico está consumindo 35% da sua energia! Tente reduzir o tempo de banho em 2-3 minutos para economizar até 20 kWh por mês.</p>
        </div>

      </div>
    </div>
  );
}

export default Relatorio;