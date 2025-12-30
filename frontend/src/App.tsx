import { Route, Routes } from 'react-router-dom';
import Home from './frontend/pages/Home/Home.tsx';
import Projeto from './frontend/pages/Projetos/Projetos.tsx';
import AppRoutes from './frontend/routes/AppRoutes.tsx';
import Equipes from './frontend/pages/Equipes/Equipes.tsx';

function App() {
  return (
    <div className="App">
      <AppRoutes />
      {/* Definindo as rotas principais */}
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="Projetos" element={<Projeto />} />
        <Route path="Equipes" element={<Equipes />} />
      </Routes>
    </div>
  );
}

export default App;
