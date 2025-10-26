import React from 'react';
import { Link } from 'react-router-dom'; // Componente para links

function Login() {
  return (
    <div>
      <h1>Tela de Login</h1>
      <p>Aqui você colocará os campos de Email e Senha.</p>

      <Link to="/register">
        Não tem uma conta? Cadastre-se
      </Link>
    </div>
  );
}

export default Login;