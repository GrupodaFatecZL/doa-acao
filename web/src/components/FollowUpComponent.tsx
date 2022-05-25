import { useEffect, useState } from 'react';
import { getProducts, deleteProductById } from '../../server/api'
import { userStorage, ProductDataResponse } from '../interfaces/interfaces';


export function FollowUpComponent() {
  const [userDounor, setUserDounor] = useState<userStorage>()
  const [listDonation, setListDonation] = useState<ProductDataResponse[]>()

  useEffect(() => {
    getDataFollowUpComponent()
  }, [])

  async function getDataFollowUpComponent() {
    const user: userStorage = JSON.parse(sessionStorage.getItem('@users:user') || "");
    setUserDounor(user)

    const donation = await getProducts()
    setListDonation(donation)
  }

  async function deleteProduct(idProduct: string | undefined) {
    if (idProduct) {
      deleteProductById(idProduct.toString()).then(() => {
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
        {listDonation && listDonation.length > 0 ? listDonation.filter(product => product?.chaveUnicaDoador === userDounor?.idUser).map((item) => {
          return (
            <div key={item.idProduct} className="flex gap-4 m-4 p-4 rounded-md border-solid border-2 border-zinc-300">
              <img src={item.fotoProduto} className="w-1/2 md:w-32 lg:w-48" alt={item.produto} />
              {item.status === true ?
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
                <div className="grid-cols-2 gap-1">
                  <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                    Wesley de Assis demonstrou interesse.
                    Deverá entrar em contato contigo até o dia 22/03/2022
                  </span>
                  <button
                    className="bg-[#08ad3f] mt-4 mb-4 min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#29d161]"
                  >
                    Confirmar retirada
                  </button>
                </div>
              }
            </div>
          )
        }) :

          <span key={1} className="m-4 text-zinc-900 font-bold text-sm whitespace-pre-wrap">
            Você ainda não anunciou nenhum produto para ser doado.
          </span>

        }
      </>
    </div>
  )
}