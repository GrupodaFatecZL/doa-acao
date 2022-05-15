export interface User {
  id?: string;
  nome?: string;
  celular?: string;
  cpf?: string;
  chaveUnica?: string;
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
  id?: string;
  produto: string;
  categoria: string;
  descricao: string;
  fotoProduto: string;
  cepDoador: string;
  complementoDoador: string;
  chaveUnicaDoador: string;

  status: boolean;
}