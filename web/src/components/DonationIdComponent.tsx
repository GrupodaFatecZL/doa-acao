import { FindCEP } from '../../server/findAddress'
import { Address } from './FormCreateUser'
import { Donation } from './FormNewDonation'
import { User } from './FormCreateUser'
import { WhatsappLogo } from 'phosphor-react'
import { useNavigate } from 'react-router-dom';

import users from '../../users.json' // mock
import donations from '../../donations.json' // mock


interface DonationProps {
  donationId: string | undefined;
}


export function DonationIdComponent({ donationId }: DonationProps) {
  const navigate = useNavigate()

  function getDonation(): Donation | undefined {
    // pegar no banco de dados
    const listDonation = donations;
    const donation: Donation | undefined = listDonation.find(donat => donat.id === donationId)
    return donation;
  }

  function getUserThisDonation(): User | undefined {
    const usersList = users;
    // buscar no banco de dados
    const user: User | undefined = usersList.find(user => user.cpf === donation?.chaveUnicaDoador || user?.id === donation?.chaveUnicaDoador)
    return user;
  }

  function redirectWhats() {
    const URL = "http://api.whatsapp.com/send?1=pt_BR&phone=" + user?.celular
    return URL
  }

  async function getAddress() {
    let address = undefined
    if (donation) {
      address = await FindCEP(donation.cepDoador)
    }
    let componentAddress
    if (address) {
      componentAddress = (
        <div className="">
          Localização: {address.bairro} - {address.cidade} - {address.estado}
        </div>
      )
    } else {
      <div className="">
        Solicite o endereço pelo whatsapp
      </div>
    }

    return componentAddress;
  }

  const donation = getDonation();
  const user = getUserThisDonation();


  return (
    <div key={donation?.id} className="w-screen flex grid-cols-2 justify-center content-center gap-6">
      <img
        src={donation?.fotoProduto}
        alt={donation?.produto}
        className="w-1/4 h-1/4"
      />

      <div className="mt-2 gap-2">
        <span className="text-zinc-900 font-medium text-sm w-full">
          {donation?.produto}
        </span>

        <div className="w-1/2 justify-content mt-4 mb-4 whitespace-pre-wrap">
          {donation?.descricao}
        </div>

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
  )
}