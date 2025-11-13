import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Páginas
import Home from './pages/Home/Home'; 
import Contato from './pages/Contato/Contato'; 
import Empresa from './pages/Empresa/Empresa';
import NovosProjetos from './pages/Projetos/NovosProjetos';
import Projeto from './pages/Projetos/Projetos';

import CriarProjetos from "./pages/Projetos/CriarProjetos"; // ou ajuste o caminho
// rotas
import AppRoutes from './routes/AppRoutes';

import './styles/global.css'; // ou o caminho correto
// Img

// const styles  = css

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
