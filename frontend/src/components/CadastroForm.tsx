import React, { useState } from "react";
import type { CadastroResponse } from "../types";

interface CadastroFormProps {
  onSuccess: () => void;
}

const CadastroForm: React.FC<CadastroFormProps> = ({ onSuccess }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim()) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);

      const response = await fetch("http://localhost:8080/cadastro", {
        method: "POST",
        body: formData,
      });

      const data: CadastroResponse = await response.json();

      setMessage(data.message);
      setNome("");
      setEmail("");
      onSuccess();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMessage("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Novo Cadastro</h2>
      <form id="cadastroForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default CadastroForm;
