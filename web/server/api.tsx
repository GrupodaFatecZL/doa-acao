import axios from 'axios';
import { User, UsersDataResponse, Product, ProductDataResponse, ProductDataUpdate } from '../src/interfaces/interfaces'


export const api = axios.create({
  baseURL: "http://localhost:3333"//import.meta.env.VITE_API_URL
})

const header = {
  headers: {
    "content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
}

// ************************ APIs users ************************

export const createUser = async (user: User): Promise<void> => {
  api.post('/user', user, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const getUsers = async (): Promise<UsersDataResponse[]> => {
  const response = await api.get<UsersDataResponse[]>('/users', header)
  return response.data
}

export const getOneUser = async (params: string): Promise<UsersDataResponse> => {
  const response = await api.get<UsersDataResponse>('/user?' + params, header)
  return response.data
}

export const updateUser = async (user: User): Promise<void> => {
  api.put('/user', user, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const deleteUserByEmail = async (email: string): Promise<void> => {
  api.delete('/user?email=' + email, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

// ************************ APIs products ************************

export const createProduct = async (product: Product): Promise<void> => {
  api.post('/product', product, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const getProducts = async (): Promise<ProductDataResponse[]> => {
  const response = await api.get<ProductDataResponse[]>('/products', header)
  return response.data
}

export const getOneProduct = async (params: string): Promise<Product> => {
  const response = await api.get<Product>('/product?' + params, header)
  return response.data
}

export const updateProduct = async (product: ProductDataUpdate): Promise<void> => {
  api.put('/product', product, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const deleteProductById = async (idProduct: string): Promise<void> => {
  api.delete('/product?idProduct=' + idProduct, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}