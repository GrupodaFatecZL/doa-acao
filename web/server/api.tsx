import axios from 'axios';
import { 
  User, UsersDataResponse, 
  Product, ProductDataResponse, ProductDataUpdate, 
  DonationDataResponse, Donation
} from '../src/interfaces/interfaces'


export const api = axios.create({
  baseURL: "https://doa-acao-production.up.railway.app" //import.meta.env.VITE_API_URL
})

const header = {
  headers: {
    "content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
}

// ************************ APIs users ************************

export const createUser = async (user: User): Promise<void> => {
  await api.post('/user', user, header)
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
  return response.data;
}

export const updateUser = async (user: User): Promise<void> => {
  await api.put('/user', user, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const deleteUserByEmail = async (email: string): Promise<void> => {
  await api.delete('/user?email=' + email, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

// ************************ APIs products ************************

export const createProduct = async (product: Product): Promise<void> => {
  await api.post('/product', product, header)
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

export const getProductsByUser = async (idUser: string): Promise<ProductDataResponse[] | undefined> => {
  const response = await api.get<ProductDataResponse[]>('/productbyuser?idUser='+idUser, header)
  return response.data
  
}

export const updateProduct = async (product: ProductDataUpdate): Promise<void> => {
  await api.put('/product', product, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const deleteProductById = async (idProduct: string): Promise<void> => {
  await api.delete('/product?idProduct=' + idProduct, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

// ************************ APIs donations ************************

export const createDonation = async (donation: Donation): Promise<void> => {
  await api.post('/donation', donation, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const getDonations = async (): Promise<DonationDataResponse[]> => {
  const response = await api.get<DonationDataResponse[]>('/donations', header)
  return response.data
}

export const getDonationByUser = async (idUser: string): Promise<DonationDataResponse[]> => {
  const response = await api.get<DonationDataResponse[]>('/donation?idUser='+idUser, header)
  return response.data
}

export const updateDonation = async (donation: DonationDataResponse): Promise<void> => {
  await api.put('/donation', donation, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}

export const deleteDonationById = async (idDonation: string): Promise<void> => {
  await api.delete('/donation?idDonation=' + idDonation, header)
    .then((resp) => {
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}