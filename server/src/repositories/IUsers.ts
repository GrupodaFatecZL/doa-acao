export interface UserData {
  id?: string;
  nome: string;
  celular?: string | null;
  cpf?: string | null
  chaveUnica?: string | null;
  email: string;
  senha?: string | null;
  cep?: string | null;
  complemento?: string | null; 
}

export interface IUsers {
  create: (data: UserData) => Promise<void>;
  find: () => Promise<UserData[]  | undefined>
}