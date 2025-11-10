import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'; // CSS Global

// Importa as páginas "sem" layout
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';

// Importa o LAYOUT PRINCIPAL
import MainLayout from './components/MainLayout';
// Importa as páginas "com" layout
import Home from './pages/Home';
import Profile from './pages/Profile'; // <-- 1. IMPORTA O PROFILE AQUI

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
    path: '/',
    element: <MainLayout />, // O MainLayout é o "pai"
    children: [
      // As páginas "filhas" que aparecem dentro do MainLayout
      {
        path: '/home', // Rota da página inicial
        element: <Home />,
      },
      {
        path: '/profile', // <-- 2. ADICIONA A ROTA DO PROFILE
        element: <Profile />,
      },
      // {
      //   path: '/map',
      //   element: <ElementoDoMapa />,
      // },
      // etc.
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);