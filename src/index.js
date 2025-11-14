import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Login from './frontend/pages/Login/Login.tsx';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(container);

// Componente de autenticação e roteamento
const AppWithAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  const login = () => {
    setIsAuthenticated(true);
    navigate('/app/home'); // Redireciona para a home do app após o login
  };

  return (
    <Routes>
      <Route path="/app/*" element={isAuthenticated ? <App /> : <Login onLogin={login} />} />
      
      {/* Rota de redirecionamento para login se não autenticado */}
      <Route path="/" element={<Login onLogin={login} />} />
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
