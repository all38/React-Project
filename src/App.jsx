import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Páginas
import Home from './frontend/pages/Home/Home'; 
import Contato from './frontend/pages/Contato/Contato'; 
import Empresa from './frontend/pages/Empresa/Empresa';
import NovosProjetos from './frontend/pages/Projetos/NovosProjetos';
import Projeto from './frontend/pages/Projetos/Projetos';

import CriarProjetos from "./frontend/pages/Projetos/CriarProjetos";
//rotas
import AppRoutes from './frontend/routes/AppRoutes';
// css global
import './frontend/styles/global.css';

function App() {
  return (
    <Router>
      <div className="containers">
      
      <AppRoutes/> 
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        <Route path="/Projeto" element={<Projeto/>} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Empresa" element={<Empresa />} />
        <Route path="/NovosProjetos" element={<NovosProjetos />} />
        <Route path="/criar-projeto" element={<CriarProjetos />} />

      </Routes>

      </div>
    </Router>
  )
}

export default App
