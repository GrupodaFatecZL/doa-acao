"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitUserUseCase = void 0;
class SubmitUserUseCase {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    async createUser(request) {
        const { nome, celular, cpf, email, senha, cep, complemento } = request;
        await this.userUseCase.createUser({ nome, celular, cpf, email, senha, cep, complemento });
    }
    async findManyUsers() {
        return await this.userUseCase.findUsers();
    }
    async findOneUser(params) {
        return await this.userUseCase.findOneUser(params);
    }
    async updateUser(request) {
        await this.userUseCase.updateUser({ ...request });
    }
    async deleteUser(email) {
        await this.userUseCase.deleteUser(email);
    }
}
exports.SubmitUserUseCase = SubmitUserUseCase;
