import { IProducts, ProductData } from "../repositories/IProducts";

export class SubmitProductUseCase {
  constructor(
    private productUseCase: IProducts
  ) {}

  async createProduct(request: ProductData) {
    const { produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status } = request;

    await this.productUseCase.createProduct({ produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status });
  }

  async findManyProducts() {
    return await this.productUseCase.findProducts();
  }

  async findProductsByUser(idUser : string) {
    return await this.productUseCase.findProductsByUser(idUser)
  }

  async findOneProduct(params: Object) {
    return await this.productUseCase.findOneProduct(params);
  }

  async updateProduct(request: ProductData) {
    await this.productUseCase.updateProduct({ ...request})
  }

  async deleteProduct(email: string) {
    await this.productUseCase.deleteProduct(email)
  }
}