import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Login from './frontend/pages/Login/Login.tsx';
import CadastroUsuario from './frontend/pages/Cadastro_Usuario/CadastroUsuario.tsx'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(container);

// Componente de autenticação e roteamento
const AppWithAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);

    // IMPORTANTE: redirecionar AQUI
    setTimeout(() => {
      navigate("/app/Home");
    }, 0);
  };

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login onLogin={login} />} />
      <Route path="/CadastroUsuario" element={<CadastroUsuario />} />

      {/* Rotas protegidas */}
      <Route
        path="/app/*"
        element={isAuthenticated ? <App /> : <Login onLogin={login} />}
      />
    </Routes>
  );
};

root.render(
  <React.StrictMode>
    <Router>
      <AppWithAuth />
    </Router>
  </React.StrictMode>
);
