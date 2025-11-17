import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './frontend/pages/Home/Home.tsx';
import Empresa from './frontend/pages/Empresa/Empresa.tsx';
import Projeto from './frontend/pages/Projetos/Projetos.tsx';
import CriarProjetos from './frontend/pages/Projetos/CriarProjetos.tsx';
import AppRoutes from './frontend/routes/AppRoutes.tsx';
import Equipes from './frontend/pages/Equipes/Equipes.tsx';

function App() {
  return (
    <div className="containers">
      <AppRoutes />
      
      {/* Definindo as rotas principais */}
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="Projetos" element={<Projeto />} />
        <Route path="Empresa" element={<Empresa />} />
        <Route path="Equipes" element={<Equipes />} />
        <Route path="Criar-projeto" element={<CriarProjetos />} />
      </Routes>
    </div>
  );
}

export default App;
