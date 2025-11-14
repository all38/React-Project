import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CriarProjeto() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    status: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Projeto cadastrado com sucesso!");
        navigate("/projeto");
      } else {
        alert("Erro ao cadastrar projeto.");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold mb-4"> Cadastrar Projeto </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div className="w-70">
          <label className="block font-semibold"> Nome do Projeto: </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
          <div>
            <label className="block font-semibold"> Descrição: </label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
              value={formData.description}
              required
            />
          </div>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">Custo (R$):</label>
            <input
              type="number"
              name="cost"
              className="w-40 border border-gray-300 rounded px-3 py-2"
              placeholder="R$ 0,0"
              onChange={handleChange}
              value={formData.cost}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Status:</label>
            <select
              name="status"
              className="w-40 border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
              value={formData.status}
              required
            >
              <option value="">Selecione</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" > Salvar Projeto </button>
      </form>
    </div>
  );
}

export default CriarProjeto;
