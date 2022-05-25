import { FindCEP } from '../../server/findAddress'
import { Product, Address, UsersDataResponse } from '../interfaces/interfaces'
import { WhatsappLogo, Heart } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { getOneProduct, getOneUser, updateProduct } from '../../server/api'

import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";

interface DonationProps {
  donationId: string | undefined;
}

export interface donationLocated {
  id?: string;
  chaveUnicaDoador: string;
  chaveUnicaBeneficiario: string;
  produto: Product;
  dataMaxRetirada: Date;
  dataRetirada: Date | undefined;
}


export function DonationIdComponent({ donationId }: DonationProps) {
  const [hasInterest, setHasInterest] = useState(false)
  const [containsAddress, setContainsAddress] = useState<Address>()
  const [donationLocated, setDonationLocated] = useState<Product | undefined>()
  const [donor, setDonor] = useState<UsersDataResponse>()

  useEffect(() => {
    getAddress()
    getDonation()
    getUserThisDonation()
  }, [])

  async function getDonation(): Promise<Product | undefined> {
    const donationLocated: Product | undefined = await getOneProduct(`idProduct=${donationId}`)
    setDonationLocated(donationLocated)
    return donationLocated;
  }

  async function getUserThisDonation(): Promise<UsersDataResponse> {
    const user: UsersDataResponse = await getOneUser(`idUser=${donationLocated?.chaveUnicaDoador}`)
    setDonor(user)
    return user;
  }

  async function handleInterest() {
    setHasInterest(true);
    await updateProduct({
      idProduct: donationId,
      status: false
    })

    //create Donation
  }


  function redirectWhats() {
    const URL = "http://api.whatsapp.com/send?1=pt_BR&phone=" + donor?.celular
    return URL
  }

  async function getAddress() {
    if (donationLocated && donationLocated.cepDoador) {
      const address = await FindCEP(donationLocated.cepDoador)
      setContainsAddress(address)
    }
  }


  function addDaysToDate() {
    const dataMaxRetirada = new Date();
    dataMaxRetirada.setDate(dataMaxRetirada.getDate() + 10);
    return dataMaxRetirada.toLocaleDateString()
  }


  return (
    <div key={donationLocated?.idProduct} className="w-screen flex grid-cols-2 place-content-center gap-6">
      <img
        src={donationLocated?.fotoProduto}
        alt={donationLocated?.produto}
        className="w-1/3 h-1/3 ml-6"
      />

      <div className="mt-2 flex flex-col w-1/2 justify-content mb-4 whitespace-pre-wrap gap-4">

        <span className="text-zinc-900 text-xl font-semibold w-full mb-4 gap-4 justify-center align-center">
          <button
            type="button"
            className="mr-2 text-zinc-900 hover:text-zinc-100"
          >
            <Link to="/donation-list">
              <ArrowLeft weight="bold" className="w-4.5 h-4" />
            </Link>
          </button>

          {donationLocated?.produto}
        </span>
        <strong>Breve descrição: </strong> {donationLocated?.descricao}
        {containsAddress ?
          <div className="mt-2 text-zinc-900 justify-content mb-4 whitespace-pre-wrap">
            <strong>Localização: </strong> {containsAddress?.bairro} - {containsAddress?.cidade} - {containsAddress?.estado}
          </div> :
          <div className="mt-2 text-zinc-900 text-sm font-normal justify-content mb-4 whitespace-pre-wrap">
            Solicite o endereço pelo whatsapp
          </div>
        }


        <div className="flex mt-6 gap-6 items-center">
          {!hasInterest ?
            <button
              className="bg-[#b02063] rounded-full px-3 h-10 text-white flex items-center group"
              onClick={() => handleInterest()}
            >
              <Heart className="w-8 h-8" color="#ffffff" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-5xl transition-all duration-600 ease-linear">
                <span className="pl-2"></span>
                Eu quero
              </span>
            </button>
            :
            <div className="w-1/3 justify-content mt-4 mb-4 whitespace-pre-wrap font-light text-sm">
              Produto reservado pra você até o dia {addDaysToDate()},
              entre em contato com o doador pelo whatsapp o quanto antes para combinar a retirada.
              Basta clicar no ícone ao lado.
            </div>
          }

          <a href={redirectWhats()} target="_blank">
            <button className="bg-[#48B020] rounded-full px-3 h-10 text-white flex items-center group">
              <WhatsappLogo className="w-8 h-8" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-5xl transition-all duration-600 ease-linear">
                <span className="pl-2"></span>
                Combine a retirada pelo whatsapp
              </span>
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}