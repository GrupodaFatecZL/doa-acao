"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsers = void 0;
const prisma_1 = require("../../prisma");
class PrismaUsers {
    async createUser({ nome, celular, cpf, email, senha, cep, complemento }) {
        await prisma_1.prisma.user.create({
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
    async findUsers() {
        const result = await prisma_1.prisma.user.findMany();
        return result;
    }
    async findOneUser(params) {
        const user = await prisma_1.prisma.user.findUnique({
            where: params
        });
        return user;
    }
    async updateUser(user) {
        await prisma_1.prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                ...user
            },
        });
    }
    async deleteUser(email) {
        await prisma_1.prisma.user.delete({
            where: {
                email: email,
            },
        });
    }
}
exports.PrismaUsers = PrismaUsers;
