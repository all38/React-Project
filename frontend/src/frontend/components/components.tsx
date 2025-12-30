import { useState } from "react";

export function useMostrarSenha() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const toggleSenha = () => setMostrarSenha(prev => !prev);
  const inputType = mostrarSenha ? "text" : "password";

  return { mostrarSenha, toggleSenha, inputType };
}

interface ModalProps {
  mensagem: string;
  tipo: "sucesso" | "erro";
  fechar: () => void;
}

export function Modal({ mensagem, tipo, fechar }: ModalProps) {
  return (
    <div>
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={fechar}
      />

      {/* Modal no topo */}
      <div
        className={`absolute top-15  transform -translate-x-1/2 p-6 rounded-md shadow-lg max-w-sm w-full ${
          tipo === "sucesso" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}
      >
        <p>{mensagem}</p>
      </div>
    </div>
  );
}