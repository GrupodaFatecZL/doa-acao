import axios from 'axios';
import { Address } from '../src/components/FormCreateUser'

export const findAddress = axios.create({
  baseURL: "https://viacep.com.br/ws/"
})


export const FindCEP = async (cep: string): Promise<Address | undefined> => {
  if (cep.length === 8) {
    const response = await findAddress.get(`${cep.replace(/[^\d]+/g, "")}/json/`)
    const data = {
      rua: response.data.logradouro,
      bairro: response.data.bairro,
      cidade: response.data.localidade,
      estado: response.data.uf
    }
    return data;
  }
}
