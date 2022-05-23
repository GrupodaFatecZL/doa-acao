import { IUsers } from "../repositories/IUsers";

interface SubmitCreateUserRequest {
  nome: string;
  celular?: string;
  cpf?: string;
  email: string;
  senha?: string;
  cep?: string;
  complemento?: string;
}

export class SubmitUserUseCase {
  constructor(
    private userUseCase: IUsers
  ) { }

  async createUser(request: SubmitCreateUserRequest) {
    const { nome, celular, cpf, email, senha, cep, complemento } = request;

    await this.userUseCase.createUser({ nome, celular, cpf, email, senha, cep, complemento });
  }

  async findManyUsers() {
    return await this.userUseCase.findUsers();
  }

  async findOneUser(email: string) {
    return await this.userUseCase.findOneUser(email);
  }

  async updateUser(request: SubmitCreateUserRequest) {
    await this.userUseCase.updateUser({ ...request})
  }

  async deleteUser(email: string) {
    await this.userUseCase.deleteUser(email)
  }
}