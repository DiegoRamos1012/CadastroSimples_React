import React, { useState } from "react";
import type { CadastroResponse } from "../types";

interface CadastroFormProps {
  onSuccess: () => void;
}

const CadastroForm: React.FC<CadastroFormProps> = ({ onSuccess }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!nome.trim() || !email.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("email", email);
      formData.append("senha", senha);

      const response = await fetch("http://localhost:8080/cadastro", {
        method: "POST",
        body: formData,
      });

      const data: CadastroResponse = await response.json();

      if (response.ok) {
        console.log("POST realizado com sucesso!");
        console.log("Dados enviados:", { nome, email, senha });
        setMessage(data.message);
        setNome("");
        setEmail("");
        setSenha("")
        onSuccess();
      } else {
        setError(data.message || "Erro ao realizar cadastro.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="cadastro-title">Novo Cadastro</h2>
      <form id="cadastroForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome: </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha: </label>
          <input
            type="senha"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}

      {error && (
        <div className="erro-animada">
          <span className="erro-icon">⚠️</span>
          <div className="erro-content">
            <h4>Erro</h4>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroForm;
