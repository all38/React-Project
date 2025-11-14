import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './frontend/pages/Home/Home.tsx';
import Contato from './frontend/pages/Contato/Contato.tsx';
import Empresa from './frontend/pages/Empresa/Empresa.tsx';
import Projeto from './frontend/pages/Projetos/Projetos.tsx';
import CriarProjetos from './frontend/pages/Projetos/CriarProjetos.tsx';
import AppRoutes from './frontend/routes/AppRoutes.tsx';

function App() {
  return (
    <div className="containers">
      {/* Aqui, AppRoutes não precisa ser uma rota. Ele deve estar fora do <Routes>, pois é um layout fixo */}
      <AppRoutes />
      
      {/* Definindo as rotas principais */}
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="projeto" element={<Projeto />} />
        <Route path="contato" element={<Contato />} />
        <Route path="empresa" element={<Empresa />} />
        <Route path="criar-projeto" element={<CriarProjetos />} />
      </Routes>
    </div>
  );
}

export default App;
