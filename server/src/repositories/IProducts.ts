export interface ProductData {
  idProduct?: string
  produto: string
  categoria: string
  descricao: string
  fotoProduto: string
  cepDoador: string
  complementoDoador: string
  chaveUnicaDoador: string
  status: boolean
}


export interface IProducts {
  createProduct: (data: ProductData) => Promise<void>;
  findProducts: () => Promise<ProductData[] | undefined>
  findOneProduct: (params: Object) => Promise<ProductData | null>
  findProductsByUser: (idUser: string) => Promise<ProductData[] | undefined>
  updateProduct: (data: ProductData) => Promise<void>
  deleteProduct: (idProduct: string) => Promise<void>
}