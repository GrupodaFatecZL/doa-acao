import { ICreateUser } from "../repositories/ICreateUser";

interface SubmitCreateUserRequest {
  nome: string;
  celular?: string;
  cpf?: string;
  chaveUnica?: string;
  email: string;
  senha?: string;
  cep?: string;
  complemento?: string;
}

export class SubmitUserUseCase {
  constructor(
    private createUser: ICreateUser
  ) {}

  async execute(request: SubmitCreateUserRequest) {
    const {  
      nome,
      celular,
      cpf,
      chaveUnica,
      email,
      senha,
      cep,
      complemento } = request;


    await this.createUser.create({ 
      nome,
      celular,
      cpf,
      chaveUnica,
      email,
      senha,
      cep,
      complemento 
    });
  }
}