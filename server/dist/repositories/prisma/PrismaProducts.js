"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProducts = void 0;
const prisma_1 = require("../../prisma");
class PrismaProducts {
    async createProduct({ produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status }) {
        await prisma_1.prisma.product.create({
            data: {
                produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status
            },
        });
    }
    async findProducts() {
        const result = await prisma_1.prisma.product.findMany();
        return result;
    }
    async findProductsByUser(idUser) {
        const Product = await prisma_1.prisma.product.findMany({
            where: {
                chaveUnicaDoador: {
                    equals: idUser
                }
            }
        });
        return Product;
    }
    async findOneProduct(params) {
        const Product = await prisma_1.prisma.product.findUnique({
            where: params
        });
        return Product;
    }
    async updateProduct(Product) {
        await prisma_1.prisma.product.update({
            where: {
                idProduct: Product.idProduct,
            },
            data: {
                ...Product
            },
        });
    }
    async deleteProduct(idProduct) {
        await prisma_1.prisma.product.delete({
            where: {
                idProduct: idProduct,
            },
        });
    }
}
exports.PrismaProducts = PrismaProducts;
