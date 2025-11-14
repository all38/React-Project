import React, { useState } from 'react';

const CriarUsuario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    apelido: '',
    email: '',
    senha: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Validação simples (por exemplo, verificar se todos os campos estão preenchidos)
    const { nome, sobrenome, apelido, email, senha } = formData;
    if (!nome || !sobrenome || !apelido || !email || !senha) {
      setErrorMessage('Todos os campos devem ser preenchidos!');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados do formulário, como uma requisição API
    console.log('Dados do usuário:', formData);

    // Resetar o formulário após o envio
    setFormData({
      nome: '',
      sobrenome: '',
      apelido: '',
      email: '',
      senha: ''
    });
    setErrorMessage('');
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Criar Usuário</h2>
      
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            required
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700">Sobrenome</label>
          <input
            type="text"
            id="sobrenome"
            name="sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
            placeholder="Seu sobrenome"
            required
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="apelido" className="block text-sm font-medium text-gray-700">Apelido</label>
          <input
            type="text"
            id="apelido"
            name="apelido"
            value={formData.apelido}
            onChange={handleChange}
            placeholder="Seu apelido"
            required
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Seu email"
            required
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Sua senha"
            required
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
};

export default CriarUsuario;
