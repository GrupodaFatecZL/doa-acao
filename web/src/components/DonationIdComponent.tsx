import { FindCEP } from '../../server/findAddress'
import { getOneProduct, getOneUser, updateProduct, createDonation } from '../../server/api'
import { Product, Address, UsersDataResponse, userStorage } from '../interfaces/interfaces'
import { WhatsappLogo, Heart, ArrowLeft } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

interface DonationProps {
  donationId: string | undefined;
}

export function DonationIdComponent({ donationId }: DonationProps) {
  const [hasInterest, setHasInterest] = useState(false)
  const [containsAddress, setContainsAddress] = useState<Address>()
  const [containsWhatsapp, setContainsWhatsapp] = useState<string>()
  const [donationLocated, setDonationLocated] = useState<Product | undefined>()
  const [receiver, setReceiver] = useState<userStorage | UsersDataResponse>()

  useEffect(() => {
    getDonation()
    getUserIsReceivingDonation()
  }, [])

  useEffect(() => {
    getAddress()
    redirectWhats()
  }, [hasInterest])


  async function getDonation(): Promise<Product | undefined> {
    const donationLocated: Product | undefined = await getOneProduct(`idProduct=${donationId}`)
    setDonationLocated(donationLocated)
    return donationLocated;
  }

  async function getUserIsReceivingDonation(): Promise<userStorage | UsersDataResponse> {
    let userIsReceivingDonation: userStorage | UsersDataResponse = JSON.parse(sessionStorage.getItem('@users:user') || "");
    if (!userIsReceivingDonation.idUser) {
      userIsReceivingDonation = await getOneUser(`email=${userIsReceivingDonation.email}`)
    }

    setReceiver(userIsReceivingDonation)
    return userIsReceivingDonation;
  }

  async function handleInterest() {
    await updateProduct({
      idProduct: donationId,
      status: false
    })

    const donation = {
      chaveUnicaDoador: donationLocated?.chaveUnicaDoador ? donationLocated?.chaveUnicaDoador : "",
      chaveUnicaBeneficiario: receiver?.idUser ? receiver?.idUser : "",
      idProduct: donationId ? donationId : "",
      dataMaxRetirada: addDaysToDate(),
      dataRetirada: null
    }

    let validationDonation = []
    for (let i = 0; i < Object.entries(donation).length; i++) {
      if (Object.entries(donation)[i][1] === '') {
        validationDonation.push(Object.entries(donation)[i])
      }
    }

    if (donation && validationDonation.length <= 0) {
      await createDonation(donation).then((resp) => {
        setHasInterest(true);
      }).catch((err) => {
        alert("Desculpe, mas acontenceu um erro")
        console.log(err)
      })
    } else {
      alert("Ocorreu um erro ao tentar reservar esse item para você. Verifique se seu cadastro está atualizado")
    }
  }


  async function redirectWhats(): Promise<string>{
    const user: UsersDataResponse = await getOneUser(`idUser=${donationLocated?.chaveUnicaDoador}`)
    const URL = "http://api.whatsapp.com/send?1=pt_BR&phone=55" + user?.celular
    setContainsWhatsapp(URL)
    return URL;
  }


  async function getAddress(): Promise<Address | undefined> {
    if (donationLocated && donationLocated.cepDoador) {
      const address = await FindCEP(donationLocated.cepDoador)
      setContainsAddress(address)
      return address;
    }
    return undefined;
  }

  function addDaysToDate() {
    const dataMaxRetirada = new Date();
    dataMaxRetirada.setDate(dataMaxRetirada.getDate() + 10);
    return dataMaxRetirada
  }


  return (
    <>
      {
        donationLocated?.chaveUnicaDoador !== receiver?.idUser ?
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
              <strong> Breve descrição: </strong> {donationLocated?.descricao}
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
                    Produto reservado pra você até o dia {addDaysToDate().toLocaleDateString()},
                    entre em contato com o doador pelo whatsapp o quanto antes para combinar a retirada.
                    Basta clicar no ícone ao lado.
                  </div>
                }

                <a href={containsWhatsapp} target="_blank">
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
          :
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
              Este produto é seu, caso queira excluir o anúncio <strong><a href="/follow-up">Clique aqui</a></strong>
            </div>
          </div>
      }
    </>
  )
}