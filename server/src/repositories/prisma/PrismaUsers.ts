import { prisma } from "../../prisma";
import {
  UserData,
  IUsers,
} from "../IUsers";



export class PrismaUsers implements IUsers {
  async create({ nome, celular, cpf, chaveUnica, email, senha, cep, complemento }: UserData) {
    await prisma.user.create({
      data: {
        nome,
        celular,
        cpf,
        chaveUnica,
        email,
        senha,
        cep,
        complemento
      },
    });
  }


  async find(): Promise<UserData[]  | undefined> {
    const result = await prisma.user.findMany()

    return result 
  }
}

