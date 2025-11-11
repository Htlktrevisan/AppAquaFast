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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);