import { prisma } from "../../prisma";
import {
  ProductData,
  IProducts,
} from "../IProducts";


export class PrismaProducts implements IProducts {
  async createProduct({ produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status }: ProductData) {
    await prisma.product.create({
      data: {
        produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status
      },
    });
  }


  async findProducts(): Promise<ProductData[]  | undefined> {
    const result = await prisma.product.findMany()
    return result 
  }


  async findOneProduct(params: Object): Promise<ProductData | null> {
    const Product = await prisma.product.findUnique({
      where: 
        params
    })

    return Product
  }


  async updateProduct(Product: ProductData): Promise<void> {
    await prisma.product.update({
      where: {
        idProduct: Product.idProduct,
      },
      data: {
        ...Product
      },
    })
  }


  async deleteProduct(idProduct: string): Promise<void> {
    await prisma.product.delete({
      where: {
        idProduct: idProduct,
      },
    })
  }
}
