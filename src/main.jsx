import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. Importe as páginas que você criou
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';

// 2. Importe o CSS principal
import './index.css';

// 3. Defina as rotas (os caminhos) do seu app
const router = createBrowserRouter([
  {
    path: '/', // A rota inicial (raiz)
    element: <SplashScreen />, // Vai mostrar a Splash Screen primeiro
  },
  {
    path: '/login', // A rota da página de login
    element: <Login />,
  },
  {
    path: '/register', // A rota da página de cadastro
    element: <Register />,
  },
]);

// 4. Manda o React renderizar o app com as rotas
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);