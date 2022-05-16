import axios from 'axios';
import { User, UsersDataResponse } from '../src/interfaces/interfaces'


export const api = axios.create({
  baseURL: "http://localhost:3333"//import.meta.env.VITE_API_URL
})

const header = {
  headers: {
    "content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
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


export const getUser = async (): Promise<UsersDataResponse[]> => {
  const response = await api.get<UsersDataResponse[]>('/users', header)
  return response.data
}