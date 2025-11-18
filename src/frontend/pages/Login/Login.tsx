import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        alert("Usuário ou senha inválidos!");
        return;
      }

      alert("Login realizado com sucesso!");
      onLogin();
      navigate("/app/Home");
    } catch (err) {
      console.error(err);
      alert("Erro ao realizar login!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen containers">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <div className="flex justify-center mb-4">
          <img
            src="/NOSYLLA_SYSTEM.webp"
            alt="Logo"
            className="w-42 h-42 rounded-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
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
    </div>
  );
}

export default Login;