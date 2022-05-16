import { IUsers } from "../repositories/IUsers";

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
    private createUser: IUsers
  ) {}

  async create(request: SubmitCreateUserRequest) {
    const { nome, celular, cpf, chaveUnica, email, senha, cep, complemento } = request;

    await this.createUser.create({ nome, celular, cpf, chaveUnica, email, senha, cep, complemento });
  }

 async findMany() {
  return await this.createUser.find();
 }
  
}