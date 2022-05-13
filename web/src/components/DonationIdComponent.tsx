import { FindCEP } from '../../server/findAddress'
import { Product } from './FormNewDonation'
import { User } from './FormCreateUser'
import { Address } from './FormCreateUser'
import { WhatsappLogo, Heart } from 'phosphor-react'
import { useEffect, useState } from 'react'

import users from '../../users.json' // mock
import donations from '../../donations.json' // mock



interface DonationProps {
  donationId: string | undefined;
}

export interface Donation {
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

  useEffect(() => {
    getAddress()
  })

  function getDonation(): Product | undefined {
    // pegar no banco de dados
    const listDonation = donations;
    const donation: Product | undefined = listDonation.find(donat => donat.id === donationId)
    return donation;
  }

  function getUserThisDonation(): User | undefined {
    const usersList = users;
    // buscar no banco de dados
    const user: User | undefined = usersList.find(user => user.cpf === donation?.chaveUnicaDoador || user?.id === donation?.chaveUnicaDoador)
    return user;
  }

  function handleInterest() {
    //salvar eu quero no banco, mandar Donation para banco
    setHasInterest(true);
  }
  

  function redirectWhats() {
    const URL = "http://api.whatsapp.com/send?1=pt_BR&phone=" + user?.celular
    return URL
  }

  async function getAddress() {
    if (donation) {
      const address = await FindCEP(donation.cepDoador)
      setContainsAddress(address)
    }
  }

  const donation = getDonation();
  const user = getUserThisDonation();

  function addDaysToDate() {
    const dataMaxRetirada = new Date();
    dataMaxRetirada.setDate(dataMaxRetirada.getDate() + 10);
    return dataMaxRetirada.toLocaleDateString()
  }


  return (
    <div key={donation?.id} className="w-screen flex grid-cols-2 place-content-center gap-6">
      <img
        src={donation?.fotoProduto}
        alt={donation?.produto}
        className="w-1/3 h-1/3 ml-6"
      />

      <div className="mt-2 flex flex-col w-1/2 justify-content mb-4 whitespace-pre-wrap" >
        <span className="text-zinc-900 text-xl font-semibold w-full mb-4">
          {donation?.produto}
        </span>
        <strong> Breve descrição: </strong> {donation?.descricao}
        { containsAddress ?
          <div className="mt-2 w-1/2 text-zinc-900 text-sm font-normal justify-content mb-4 whitespace-pre-wrap">
            <strong>Localização: </strong> {containsAddress?.bairro} - {containsAddress?.cidade} - {containsAddress?.estado}
          </div> :
          <div className="mt-2 w-1/2 text-zinc-900 text-sm font-normal justify-content mb-4 whitespace-pre-wrap">
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
            <div className="w-1/2 justify-content mt-4 mb-4 whitespace-pre-wrap font-light text-sm">
              Produto reservado pra você até o dia {addDaysToDate()},
              entre em contato com o doador pelo whatsapp o quanto antes, basta clicar no ícone ao lado.
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