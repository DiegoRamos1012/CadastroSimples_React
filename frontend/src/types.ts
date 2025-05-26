// Interface que corresponde à struct CadastroResponse do backend Go
export interface CadastroResponse {
  nome: string;
  email: string;
  message: string;
}

export interface Cadastro {
  id: number;
  nome: string;
  email: string;
}
