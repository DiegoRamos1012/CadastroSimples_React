import React, { useState, useEffect } from "react";
import CadastroForm from "./components/CadastroForm";
import CadastroList from "./components/CadastroList";
import type { Cadastro } from "./types";

const App: React.FC = () => {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCadastros();
  }, []);

  const fetchCadastros = async () => {
    try {
      const response = await fetch("http://localhost:8080/cadastro");
      const data = await response.json();
      setCadastros(data.cadastros);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar cadastros:", error);
      setLoading(false);
    }
  };

  const handleCadastroSuccess = () => {
    fetchCadastros(); // Recarrega a lista após um novo cadastro
  };

  return (
    <div className="container">
      <h1>Sistema de Cadastro Simples</h1>
      <div className="card">
        <CadastroForm onSuccess={handleCadastroSuccess} />
      </div>
      {loading ? (
        <p>Carregando cadastros...</p>
      ) : (
        <CadastroList cadastros={cadastros} />
      )}
    </div>
  );
};

export default App;
