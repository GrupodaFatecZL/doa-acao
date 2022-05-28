export interface User {
  idUser?: string;
  nome?: string;
  celular?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  cep?: string;
  complemento?: string;
}

export interface Address {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface Product {
  idProduct?: string;
  produto: string;
  categoria: string;
  descricao: string;
  fotoProduto: string;
  cepDoador: string;
  complementoDoador: string;
  chaveUnicaDoador: string;

  status: boolean;
}

export interface ProductDataResponse {
  idProduct?: string;
  produto: string;
  categoria?: string;
  descricao?: string;
  fotoProduto?: string;
  cepDoador?: string;
  complementoDoador?: string;
  chaveUnicaDoador?: string;

  status?: boolean;
}

export interface ProductDataUpdate {
  idProduct?: string;
  produto?: string;
  categoria?: string;
  descricao?: string;
  fotoProduto?: string;
  cepDoador?: string;
  complementoDoador?: string;
  chaveUnicaDoador?: string;

  status?: boolean;
}

export type UsersDataResponse = {
  idUser: string;
  nome: string;
  celular: string | null;
  cpf: string | null
  email: string;
  senha: string | null;
  cep: string | null;
  complemento: string | null; 
}


export type userStorage = {
  idUser?: string;
  nome: string;
  email: string;
  celular?: string;
  cep?: string;
  complemento?: string;
  cpf?: string;
  senha?: string;
}


export type Donation = {
  idDonation?: string
  chaveUnicaDoador: string
  chaveUnicaBeneficiario: string
  idProduct: string 
  dataMaxRetirada: Date
  dataRetirada?: Date | null
}

export type DonationDataResponse = {
  idDonation?: string
  chaveUnicaDoador?: string
  chaveUnicaBeneficiario?: string
  idProduct?: string 
  dataMaxRetirada?: Date
  dataRetirada?: Date | null
}