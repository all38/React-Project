import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, useMostrarSenha } from "../../components/components.tsx";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // mostrar senha 
  const { mostrarSenha, toggleSenha, inputType } = useMostrarSenha();

  // modal
  const [modal, setModal] = useState<{ msg: string; tipo: "sucesso" | "erro" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        setModal({ msg: "Usuário ou senha inválidos!", tipo: "erro" });
        return;
      }

      setModal({ msg: "Login realizado com sucesso!", tipo: "sucesso" });
    } catch (err) {
      console.error(err);
      setModal({ msg: "Erro ao realizar login!", tipo: "erro" });
    }
  };

  // AUTO-FECHAMENTO DO MODAL E REDIRECIONAMENTO
  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => {
        if (modal.tipo === "sucesso") {
          onLogin();
          navigate("/app/Home");
        }
        setModal(null);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [modal, navigate, onLogin]);

  return (
    <div className="Pagina-Login">
      <div className="Login-Painel">

        <div className="flex justify-center mb-4">
          <img
            src="/NOSYLLA_SYSTEM.webp"
            alt="Logo"
            className="w-42 h-42 rounded-full object-cover"
          />
        </div>

        <h2 className="Titulo-Login">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="Texto-Login">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="mt-2 font-semibold block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="Texto-Login">Senha</label>
            <input
              type={inputType}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="mt-2 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            <button
              type="button"
              onClick={toggleSenha}
              className="absolute right-3 top-[46px] text-gray-600"
            >
              {mostrarSenha ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>

        <button
          className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          onClick={() => navigate("/CadastroUsuario")}
        >
          Criar Conta
        </button>
      </div>

      {/* MODAL */}
      {modal && (
        <Modal
          mensagem={modal.msg}
          tipo={modal.tipo}
          fechar={() => setModal(null)}
        />
      )}
    </div>
  );
}

export default Login;