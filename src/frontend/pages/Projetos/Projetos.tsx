import React, { useEffect, useState } from "react";

import ImgProjeto from "../../../assets/img/projeto.png" 
import { Link } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  description: string;
  cost: string;
  status: string;
}

function Projeto() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    cost: "",
    status: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(data))
      .catch((erro) => console.error("Erro ao buscar projetos:", erro));
  }, []);

  const handleEditClick = (project: Project) => {
    setEditandoId(project.id);
    setEditData({
      name: project.name,
      description: project.description,
      cost: project.cost,
      status: project.status,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSave = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar na API");
    }

    const updatedProject: Project = await response.json();

    // Atualiza estado com o dado salvo na API
    const projetosAtualizados = projects.map((proj) =>
      proj.id === id ? updatedProject : proj
    );

    setProjects(projetosAtualizados);
    setEditandoId(null);
    } catch (erro) {
      console.error("Erro ao salvar edição:", erro);
    }
  };

  const handleCancelEdit = () => {
    setEditandoId(null);
  };

  const handleDelete = (id: number) => {
    const confirm = window.confirm("Deseja realmente excluir este projeto?");
    if (!confirm) return;

    // Remove da UI
    setProjects(projects.filter((p) => p.id !== id));

    // Remove da API
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Erro ao excluir projeto:", err));
  };

  return (
    <div className="page-container">
      <h1 className="titulo-h1">Projetos</h1>
      <p>Gererencie seus projetos, edite, exclua com facilidade.</p>

      <div className="mt-3 border border-gray-400 rounded-lg p-4 w-fit flex items-center gap-4 bg-white shadow-sm dark:bg-slate-800">
          <Link to="/criar-projeto" className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition"
            > Criar Projeto</Link>
          <img src={ImgProjeto} alt="projeto"className="w-16 h-16 object-contain"/>
      </div>

      {projects.length === 0 ? (  
        <p className="text-gray-600 mt-6">Nenhum projeto cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow p-5 border border-gray-200"
            >
              {editandoId === project.id ? (
                <>
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="w-full border p-1 mb-2 rounded"
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="w-full border p-1 mb-2 rounded"
                  />
                  <input
                    name="cost"
                    value={editData.cost}
                    onChange={handleEditChange}
                    className="w-full border p-1 mb-2 rounded"
                  />
                  <input
                    name="status"
                    value={editData.status}
                    onChange={handleEditChange}
                    className="w-full border p-1 mb-2 rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditSave(project.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-3">{project.name}</h2>
                  <p className="text-gray-700 max-h-24 overflow-y-auto break-words">{project.description}</p>
                  <p className="text-sm text-gray-500 mt-2"> 💰 Custo: R$ {project.cost} </p>
                  <p className="text-sm text-gray-500"> 📌 Status: {project.status} </p>
                  <button
                    onClick={() => handleEditClick(project)}
                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  > Editar
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  > Excluir
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projeto;
