import React from "react";
import type { Cadastro } from "../types";

interface CadastroListProps {
  cadastros: Cadastro[];
}

const CadastroList: React.FC<CadastroListProps> = ({ cadastros }) => {
  if (!cadastros.length) {
    return (
      <div className="cadastro-list">
        <h2>Cadastros</h2>
        <p>Nenhum cadastro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="cadastro-list">
      <h2>Cadastros</h2>
      {cadastros.map((cadastro) => (
        <div key={cadastro.id} className="cadastro-item">
          <p>
            <strong>ID:</strong> {cadastro.id}
          </p>
          <p>
            <strong>Nome:</strong> {cadastro.nome}
          </p>
          <p>
            <strong>E-mail:</strong> {cadastro.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CadastroList;
