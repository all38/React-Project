import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const navigate = useNavigate();

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Cadastro de Usuário
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full"
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
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
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
