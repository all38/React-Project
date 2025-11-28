import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";
// estilo 
import "../styles/global.css";

function AppRoutes () {
    return (
        <nav className="flex flex-col items-start gap-4 p-4 bg-white rounded-lg shadow-md border">
            <Link to="/app/Home" className="Botoes"> Lobby </Link>
            <Link to="/app/Projetos" className="Botoes"> Projetos </Link>
            <Link to="/app/Equipes" className="Botoes"> Equipes </Link>

            <div className="flex justify-center gap-5 mt-auto w-full px-4">
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
