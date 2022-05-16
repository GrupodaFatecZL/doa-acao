export interface UserData {
  nome: string;
  celular?: string;
  cpf?: string;
  chaveUnica?: string;
  email: string;
  senha?: string;
  cep?: string;
  complemento?: string;
}

export interface ICreateUser {
  create: (data: UserData) => Promise<void>;
}