"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitProductUseCase = void 0;
class SubmitProductUseCase {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }
    async createProduct(request) {
        const { produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status } = request;
        await this.productUseCase.createProduct({ produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status });
    }
    async findManyProducts() {
        return await this.productUseCase.findProducts();
    }
    async findProductsByUser(idUser) {
        return await this.productUseCase.findProductsByUser(idUser);
    }
    async findOneProduct(params) {
        return await this.productUseCase.findOneProduct(params);
    }
    async updateProduct(request) {
        await this.productUseCase.updateProduct({ ...request });
    }
    async deleteProduct(email) {
        await this.productUseCase.deleteProduct(email);
    }
}
exports.SubmitProductUseCase = SubmitProductUseCase;
