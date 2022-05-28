import { prisma } from "../../prisma";
import {
  UserData,
  IUsers,
} from "../IUsers";



export class PrismaUsers implements IUsers {
  async createUser({ nome, celular, cpf, email, senha, cep, complemento }: UserData) {
    await prisma.user.create({
      data: {
        nome,
        celular,
        cpf,
        email,
        senha,
        cep,
        complemento
      },
    });
  }


  async findUsers(): Promise<UserData[]  | undefined> {
    const result = await prisma.user.findMany()
    return result 
  }


  async findOneUser(params: Object): Promise<UserData | null> {
    const user = await prisma.user.findUnique({
      where: 
        params
    })

    return user
  }


  async updateUser(user: UserData): Promise<void> {
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        ... user
      },
    })
  }


  async deleteUser(email: string): Promise<void> {
    await prisma.user.delete({
      where: {
        email: email,
      },
    })
  }
}

