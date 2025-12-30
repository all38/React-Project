import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMostrarSenha } from "../../components/components.tsx";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mostrarSenha, toggleSenha, inputType } = useMostrarSenha();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFotoPerfil(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("senha", senha);

    if (fotoPerfil) {
      formData.append("foto", fotoPerfil);
    }

    try {
      const response = await fetch("http://localhost:5000/cadastro", {
        method: "POST",
        body: formData, // FORM DATA!
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.erro || "Erro ao cadastrar usuário!");
        return;
      }

      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div className="Pagina-Login">
      <div className="Login-Painel">

        <h2 className="Titulo">
          Cadastro de Usuário
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="Texto">Foto de Perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-white cursor-pointer"
            />

            {/* Pré-visualização */}
            {preview && (
              <img
                src={preview}
                alt="Prévia da foto"
                className="mt-4 w-32 h-32 object-cover rounded-full mx-auto shadow"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="Texto">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="Texto">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="Texto">Senha</label>
            <input
              type={inputType}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite uma senha"
              className="mt-2 block w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />

            {/* Botão para mostrar/ocultar senha */}
            <button
              type="button"
              onClick={toggleSenha}
              className="absolute right-3 top-[46px] text-gray-600"
            >
              {mostrarSenha ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </button>
        </div>

          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded-md">
            Cadastrar
          </button>
        </form>

        <button
          className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded-md"
          onClick={() => navigate("/")}
        >
          Voltar para Login
        </button>
      </div>
    </div>
  );
}

export default CadastroUsuario;
