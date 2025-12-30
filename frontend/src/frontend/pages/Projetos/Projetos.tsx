import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Projetos() {

  return (
    <div className="Container-Paginas-Projetos">
      {/* aba superior */}
      <div className="Aba-Superior-Painel">
        <div className="Aba-Superior">
          Projetos
          <button className="Botoes-Projetos">Analisar Atividades</button>
          <button className="Botoes-Projetos">Inspecionar Tarefas</button>
          <button className="Botoes-Projetos">Gerenciar Grupos</button>
          <button className="Botoes-Projetos">Analizar Insights</button>
          <button className="Botoes-Projetos">Criar Projeto</button>
        </div>
      </div>
      
      <p className="Texto">Pagina dedicada a gerenciamento de projetos, acompanhamento, gestão de atividades e insights</p>
      
      {/* linha */}
      <div className="border"></div>
      
    </div>
  )
}

export default Projetos;