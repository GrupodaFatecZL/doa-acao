import axios, { AxiosResponse } from 'axios';
import { User } from '../src/interfaces/interfaces'

export const api = axios.create({
  baseURL: "http://localhost:3333"//import.meta.env.VITE_API_URL
})

const header = {
  headers: {
    "content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
}

type UserData = {
  id: string;
  nome: string;
  celular: string | null;
  cpf: string | null
  chaveUnica: string | null;
  email: string;
  senha: string | null;
  cep: string | null;
  complemento: string | null; 
}


export const createUser = async (user: User): Promise<void> => {
  api.post('/user', user, header)
    .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.log(err)
      return err
    })
}


export const getUser = (): Promise<AxiosResponse<UserData[], any>> => {
  const response: Promise<AxiosResponse<UserData[], any>> = api.get('/users', header)

  return response
    // .then((resp) => {
    //   console.log(resp)
    //   return resp
    // }).catch((err) => {
    //   console.log(err)
    //   return err
    // })
}