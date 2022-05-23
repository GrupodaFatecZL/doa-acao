export interface UserData {
  id?: string;
  nome: string;
  celular?: string | null;
  cpf?: string | null
  email: string;
  senha?: string | null;
  cep?: string | null;
  complemento?: string | null; 
}

export interface IUsers {
  createUser: (data: UserData) => Promise<void>;
  findUsers: () => Promise<UserData[]  | undefined>
  findOneUser: (email: string) => Promise<UserData | null>
  updateUser: (data: UserData) => Promise<void>
  deleteUser: (email: string) => Promise<void>
}