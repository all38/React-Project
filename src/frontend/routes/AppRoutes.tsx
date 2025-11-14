import { Link } from "react-router-dom";
// img
import MoneyImg from "../../assets/img/Money.jpg";
import ImgPerfil from "../../assets/img/cthulhu.webp";
import {FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";
// estilo 
import "../styles/global.css";

function AppRoutes () {
    return (
        <nav className="flex flex-col items-start gap-4 p-4 w-64 bg-white rounded-lg shadow-md y-">
            <Link to="/"><img src={MoneyImg} alt='Money'/></Link>
            <Link to="/app/Home" className="botoes"> Home </Link>
            <Link to="/app/Projeto" className="botoes"> Projeto </Link>
            <Link to="/app/Contato"className="botoes"> Contato </Link>
            <Link to="/app/Empresa" className="botoes"> Empresa </Link>
            <Link to="/app/NovosProjetos" className="botoes"> Novos Projetos</Link>

            <div className="flex flex-col items-center justify-center w-full mt-4">
                <h1 className="text-black font-bold text-sm mt-2 font-serif">Perfil</h1>
                <img 
                    src={ImgPerfil} 
                    alt="perfil" 
                    className="w-20 h-20 rounded-full shadow-md object-cover"
                />
                <h1 className="text-black font-bold text-sm mt-2 font-serif">Allyson</h1>
            </div>

            <div className="flex justify-center gap-4 mt-auto w-full px-4">
                <a href="https://www.facebook.com/share/16HPd6YiTM/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-xl cursor-pointer hover:text-blue-600" />
                </a>
                <a href="https://www.instagram.com/allysonolliveira/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-xl cursor-pointer hover:text-pink-500" />
                </a>
                <a href="https://www.linkedin.com/in/allyson-de-araujo-oliveira-8b3206183/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-xl cursor-pointer hover:text-blue-700" />
                </a>
            </div>
        </nav>
    )
}

export default AppRoutes;
