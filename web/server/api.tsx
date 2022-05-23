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


export const getUserByEmail = async (email: string): Promise<UsersDataResponse> => {
  const response = await api.get<UsersDataResponse>('/user?email=' + email, header)
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