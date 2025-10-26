import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div>
      <h1>Tela de Cadastro</h1>
      <p>Aqui será o começo do seu fluxo de cadastro.</p>

      <Link to="/login">
        Já tem uma conta? Faça Login
      </Link>
    </div>
  );
}

export default Register;