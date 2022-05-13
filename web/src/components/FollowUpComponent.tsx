import donations from '../../donations.json' // mock

export function FollowUpComponent() {
  const user = {
    "id": "1",
    "nome": "Elen Carvalho",
    "celular": "11999999999",
    "cpf": "01234567891",
    "email": "elen@gmail.com",
    "senha": "123456",
    "cep": "03806020",
    "complemento": "03"
  }

  const donation = donations

  return (
    <div className="w-screen content-center">
      <>
        {donation.filter(x => x.chaveUnicaDoador === user.cpf).map((item) => {
          if (!item) {
            return (
              <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                Você ainda não anunciou nenhum produto para ser doado.
              </span>
            )

          }

          return (
            <div className="flex gap-4 m-4 p-4 rounded-md border-solid border-2 border-zinc-300">
              <img src={item.fotoProduto} className="w-16 md:w-32 lg:w-48" alt={item.produto} />
              {item.status === true ?
                <div className="grid-cols-2 gap-1">
                  <span className="whitespace-pre-wrap">
                    Não há donatário até o momento.
                  </span>
                  <button
                    className="bg-[#ee0707] mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#ec6868]"
                  >
                    Remover anuncio
                  </button>
                  <button
                    className="bg-[#1915ee] mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#3b95e9]"
                  >
                    Editar anuncio
                  </button>
                </div>
                :
                <div className="grid-cols-2 gap-1">
                  <span className="text-zinc-900 font-regular text-sm whitespace-pre-wrap">
                    Wesley de Assis demonstrou interesse.
                    Deverá entrar em contato contigo até o dia 22/03/2022
                  </span>
                  <button
                    className="bg-[#08ad3f] mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#29d161]"
                  >
                    Confirmar retirada
                  </button>
                </div>
              }
            </div>
          )
        })}
      </>
    </div >
  )
}