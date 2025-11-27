import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'; // CSS Global

// Importa as páginas "sem" layout
import SplashScreen from './pages/SplashScreen.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// Importa o LAYOUT PRINCIPAL
import MainLayout from './components/MainLayout.jsx';

// Importa as páginas "com" layout
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Map from './pages/Map.jsx';
import Comments from './pages/Comments.jsx';
import Energy from './pages/Energy.jsx';
import Pagamentos from './pages/Pagamentos.jsx';
import Chat from './pages/Chat.jsx';
import Relatorio from './pages/Relatorio.jsx'; // ⭐ NOVO - Relatório de Energia

// --- NOSSAS PÁGINAS DE CÔMODO ---
import RoomEnergy from './pages/RoomEnergy.jsx';       // Página da Sala
import KitchenEnergy from './pages/KitchenEnergy.jsx'; // Página da Cozinha
import BedroomEnergy from './pages/BedroomEnergy.jsx'; // Página do Quarto
import BathroomEnergy from './pages/BathroomEnergy.jsx'; // Página do Banheiro

import Plans from './pages/Plans.jsx';
import Product from './pages/Product.jsx';

const router = createBrowserRouter([

  // --- Rotas sem a barra de navegação ---
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // --- Rotas COM a barra de navegação ---
  {
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/map',
        element: <Map />,
      },
      {
        path: '/comments',
        element: <Comments />,
      },
      {
        path: '/planos',
        element: <Plans />,
      },
      {
        path: '/produto',
        element: <Product />,
      },
      {
        path: '/energia',
        element: <Energy />,
      },
      {
        path: '/energia/sala',
        element: <RoomEnergy />,
      },
      {
        path: '/energia/cozinha',
        element: <KitchenEnergy />,
      },
      {
        path: '/energia/quarto',
        element: <BedroomEnergy />,
      },
      {
        path: '/energia/banheiro',
        element: <BathroomEnergy />,
      },
      {
        path: '/pagamentos',
        element: <Pagamentos />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      // ⭐ NOVA ROTA - Relatório
      {
        path: '/relatorio',
        element: <Relatorio />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);