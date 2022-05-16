import axios from 'axios';
import { User } from '../src/interfaces/interfaces'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const CreateUser = async (user: User): Promise<void> => {
  await api.post('/user', user)
}