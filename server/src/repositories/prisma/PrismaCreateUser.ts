import { prisma } from "../../prisma";
import {
  UserData,
  ICreateUser,
} from "../ICreateUser";

export class PrismaCreateUser implements ICreateUser {
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

}