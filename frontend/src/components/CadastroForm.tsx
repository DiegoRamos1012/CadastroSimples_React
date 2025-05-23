import React, { useState } from 'react';
import { CadastroResponse } from '../types';
import './CadastroForm.css';

const CadastroForm: React.FC = () => {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estado para mostrar/esconder senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // Estado para mensagens de sucesso/erro
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro', conteudo: React.ReactNode } | null>(null);
  
  // Estado para indicar quando o formulário está sendo enviado
  const [enviando, setEnviando] = useState(false);

  // Função para alternar visibilidade da senha
  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEnviando(true);
    setMensagem(null);

    try {
      // Enviar dados para o backend
      const response = await fetch('http://localhost:8080/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          nome,
          email,
          senha,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar os dados: ${response.status} ${response.statusText}`);
      }

      // Obter e processar a resposta
      const responseText = await response.text();
      console.log('Resposta do servidor:', responseText);

      // Converter para JSON
      let data: CadastroResponse;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('Erro ao processar JSON:', jsonError);
        throw new Error('Resposta do servidor não é um JSON válido');
      }

      console.log('Dados processados:', data);

      // Mostrar mensagem de sucesso usando APENAS dados do backend
      setMensagem({
        tipo: 'sucesso',
        conteudo: (
          <>
            <p>{data.message}</p>
            <p>Nome: {data.nome}</p>
            <p>Email: {data.email}</p>
            <p>Senha: ****** (dados sensíveis)</p>
          </>
        ),
      });

      // Limpar o formulário
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error('Erro completo:', error);
      setMensagem({
        tipo: 'erro',
        conteudo: (
          <>
            <div className="erro-icon">⚠️</div>
            <div className="erro-content">
              <h4>Falha no Cadastro</h4>
              <p>
                {error instanceof Error
                  ? error.message
                  : 'Erro ao processar o cadastro. Tente novamente.'}
              </p>
            </div>
          </>
        ),
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="cadastro-container">
      <form id="cadastroForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group senha-group">
          <label htmlFor="senha">Senha:</label>
          <div className="senha-container">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button
              type="button"
              id="toggleSenha"
              className={mostrarSenha ? 'visible' : ''}
              onClick={toggleSenha}
            >
              {mostrarSenha ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>

      {mensagem && (
        <div id="mensagem" className={mensagem.tipo === 'sucesso' ? 'sucesso' : 'erro erro-animada'}>
          {mensagem.conteudo}
        </div>
      )}
    </div>
  );
};

export default CadastroForm;
