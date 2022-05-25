import { useEffect, useState } from 'react';
import { getProductsByUser, deleteProductById, getDonationByUser, getOneUser, updateDonation } from '../../server/api'
import { userStorage, ProductDataResponse, DonationDataResponse, UsersDataResponse } from '../interfaces/interfaces';


export function FollowUpComponent() {
  const [userDonor, setUserDonor] = useState<userStorage>()
  const [userReceived, setUserReceived] = useState<UsersDataResponse[] | []>()
  const [listProduct, setListProduct] = useState<ProductDataResponse[] | []>()
  const [listDonation, setListDonation] = useState<DonationDataResponse[] | []>()

  useEffect(() => {
    async function getCurrentDonation() {
      await getDataFollowUpComponent()
    }
    getCurrentDonation()
  }, [])


  async function getDataFollowUpComponent() {
    const user: userStorage = JSON.parse(sessionStorage.getItem('@users:user') || "");
    setUserDonor(user);
    const userValid = user

    if (userValid) {
      const product = await getProductsByUser(Array.isArray(userValid) ? userValid[0]?.idUser : user?.idUser)
      const donation = await getDonationByUser(Array.isArray(userValid) ? userValid[0]?.idUser : user?.idUser)

      setListProduct(product)
      setListDonation(donation)
      return await getDataDonation();
    }
  }

  async function getDataDonation(): Promise<void> {
    if (listDonation) {
      let userReceived
      listDonation.map(async (item) => {
        userReceived = await getOneUser(`idUser=${item?.chaveUnicaBeneficiario}`)
        setUserReceived([userReceived])
      })
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

  return (
    <div className="w-screen content-center">
      <>
        {listProduct && listProduct.length > 0 ? listProduct.filter(product => product?.chaveUnicaDoador === userDonor?.idUser)
          .map((item) => {
            return (
              <div key={item.idProduct} className="flex gap-4 m-4 p-4 rounded-md border-solid border-2 border-zinc-300">
                <img src={item.fotoProduto} className="w-1/2 md:w-32 lg:w-48" alt={item.produto} />
                { item.status === true ?
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
                    { listDonation && userReceived && listDonation.filter(donation => userReceived?.map((user) => {
                      if (donation.chaveUnicaBeneficiario === user.idUser) {
                        if (donation.dataRetirada !== null) {
                          return (
                            <div className="grid-cols-2 gap-1">
                              <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                                Parabéns, você realizou a doação com sucesso!
                                A entrega foi confirmada no dia {donation.dataRetirada?.toLocaleDateString()}
                              </span>
                            </div>
                          )
                        } else {
                          return (
                            <div className="grid-cols-2 gap-1">
                              <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                                {user.nome} demonstrou interesse.
                                Deverá entrar em contato contigo até o dia {donation.dataMaxRetirada?.toLocaleDateString()}
                              </span>
                              <button
                                className="bg-[#08ad3f] mt-4 mb-4 min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#29d161]"
                                onClick={() => confirmDonation(donation.idDonation)}
                              >
                                Confirmar retirada
                              </button>
                            </div>
                          )
                        }
                      }
                    }))}
                  </>
                }
              </div>
            )
          }) :
          <span className="text-zinc-900 text-SM font-semibold w-full m-4 gap-4 justify-center align-center">
            Você ainda não cadastrou nenhum produto para ser doado
          </span>
        }
      </>
    </div>
  )
}