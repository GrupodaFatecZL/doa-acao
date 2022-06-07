import { useEffect, useState } from 'react';
import { getProductsByUser, deleteProductById, getDonationByUser, getUsers, updateDonation, deleteDonationById, updateProduct } from '../../server/api';
import { userStorage, ProductDataResponse } from '../interfaces/interfaces';

type DonationReceived = {
  idDonation: string | undefined;
  idProduct: string | undefined;
  dataRetirada: string | undefined;
  nome: string;
}

type DonationInTransition = {
  idDonation: string | undefined;
  idProduct: string | undefined;
  dataMaxRetirada: string | undefined;
  nome: string;
}

export function FollowUpComponent() {
  const [userDonor, setUserDonor] = useState<userStorage>()
  const [donationReceived, setDonationReceived] = useState<DonationReceived[] | []>()
  const [donationInTransition, setDonationInTransition] = useState<DonationInTransition[] | []>()
  const [listProduct, setListProduct] = useState<ProductDataResponse[] | []>()


  useEffect(() => {
    async function getCurrentDonation() {
      await getDataFollowUpComponent();
    }

    getCurrentDonation()
  }, [])


  async function getDataFollowUpComponent() {
    const user: userStorage = JSON.parse(sessionStorage.getItem('@users:user') || "");
    setUserDonor(user);

    if (user) {
      const product = await getProductsByUser(Array.isArray(user) ? user[0]?.idUser : user?.idUser)
      setListProduct(product)

      const donations = await getDonationByUser(Array.isArray(user) ? user[0]?.idUser : user?.idUser)
      const users = await getUsers()

      let receivers: DonationReceived[] = []
      let transitions: DonationInTransition[] = []

      if (donations && donations.length > 0) {
        donations.map((donation) => {
          if (donation.dataRetirada !== null) {
            let usersReceived = users.find(user => user.idUser === donation.chaveUnicaBeneficiario)
            let dateReceived = donation.dataRetirada
            if (usersReceived && dateReceived) {
              receivers.push({
                idDonation: donation.idDonation,
                idProduct: donation.idProduct,
                dataRetirada: new Date(dateReceived).toLocaleDateString(),
                nome: usersReceived.nome
              })
            }
          } else {
            let usersInTransition = users.find(user => user.idUser === donation.chaveUnicaBeneficiario)
            let dateInTransition = donation.dataMaxRetirada 
 
            if (usersInTransition && dateInTransition) {
              transitions.push({
                idDonation: donation.idDonation,
                idProduct: donation.idProduct,
                dataMaxRetirada: new Date(dateInTransition).toLocaleDateString(),
                nome: usersInTransition.nome
              })
            }
          }
        })

        setDonationReceived(receivers)
        setDonationInTransition(transitions)
      }
    }
  }

  async function deleteProduct(idProduct: string | undefined): Promise<void> {
    if (idProduct) {
      await deleteProductById(idProduct.toString()).then(() => {
        getDataFollowUpComponent()
      }).catch((err) => {
        alert("Desculpe, mas acontenceu um erro")
        console.log(err)
      })
    }
  }

  async function confirmDonation(idDonation: string | undefined) {
    if (idDonation) {
      const data = {
        idDonation: idDonation.toString(),
        dataRetirada: new Date()
      }

      await updateDonation(data).then(() => {
        getDataFollowUpComponent()
      }).catch((err) => {
        alert("Desculpe, mas acontenceu um erro")
        console.log(err)
      })
    }
  }

  async function undoInterest(idDonation: string | undefined, idProduct: string | undefined) {
    if (idDonation && idProduct) {
      await deleteDonationById(idDonation)
        .then(async () => {
          const data = {
            idProduct: idProduct,
            status: true
          }

          await updateProduct(data).then(() => {
            getDataFollowUpComponent()
          }).catch((err) => {
            alert("Desculpe, mas acontenceu um erro")
            console.log(err)
          })
        }).catch((err) => {
          alert("Desculpe, mas acontenceu um erro")
          console.log(err)
        })
    }
  }

  return (
    <div className="w-screen content-center">
      <>
        {
          listProduct && listProduct.length > 0 ?
            listProduct.filter(product => product?.chaveUnicaDoador === userDonor?.idUser)
              .map((item) => {
                return (
                  <div key={item.idProduct} className="flex gap-4 m-4 p-4 rounded-md border-solid border-2 border-zinc-300">
                    <img src={item.fotoProduto} className="w-1/2 md:w-32 lg:w-48" alt={item.produto} />
                    {
                      item.status === true ?
                        <div className="grid-cols-2 gap-1">
                          <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                            Não há donatário até o momento.
                          </span>
                          <button
                            className="bg-[#ee0707] mt-4 mb-4 min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#ec6868]"
                            onClick={() => deleteProduct(item?.idProduct)}
                          >
                            Remover anuncio
                          </button>
                        </div>
                      :
                        <>
                          {
                            donationInTransition && donationInTransition.length > 0 ?
                              donationInTransition.map((x) => {
                                if (x.idProduct === item.idProduct) {
                                  return (
                                    <div className="grid-cols-2 gap-1">
                                      <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                                        {x.nome} demonstrou interesse.
                                        Deverá entrar em contato contigo até o dia {x.dataMaxRetirada}
                                      </span>
                                      <button
                                        className="bg-[#08ad3f] mt-4 mb-4 min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#29d161]"
                                        onClick={() => confirmDonation(x.idDonation)}
                                      >
                                        Confirmar retirada
                                      </button>
                                      <button
                                        className="bg-[#e7f706] mt-4 mb-4 min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#dae485]"
                                        onClick={() => undoInterest(x.idDonation, x.idProduct)}
                                      >
                                        Não haverá retirada
                                      </button>
                                    </div>
                                  )
                                }
                              })
                              :
                              donationReceived && donationReceived.length > 0
                              && donationReceived.map((y) => {
                                if (y.idProduct === item.idProduct) {
                                  return (
                                    <div className="grid-cols-2 gap-1">
                                      <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                                        Parabéns, você realizou a doação para {y.nome} com sucesso!
                                        A entrega foi confirmada no dia {y.dataRetirada}
                                      </span>
                                    </div>
                                  )
                                }
                              })
                          }
                        </>
                    }
                  </div>
                )
              }) 
            :
            <span className="text-zinc-900 text-SM font-semibold w-full m-4 gap-4 justify-center align-center">
              Você ainda não cadastrou nenhum produto para ser doado
            </span>
        }
      </>
    </div>
  )
}