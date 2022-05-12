import { useState } from "react"
import { Donation } from "./FormNewDonation"
import { MagnifyingGlass } from "phosphor-react"

export function DonationListComponent() {
  const [listDonation, setListDonation] = useState<[Donation]>()
  const [textFilter, setTextFilter] = useState("")

  function getDonationList() {
    //pegar do banco os donation
    const data = [
      {
        id: "1",
        produto: "Harry Potter e a Pedra Filosofal",
        categoria: "Livro",
        descricao: "O livro está novo, primeira edição",
        fotoProduto: "https://images-na.ssl-images-amazon.com/images/I/61jgm6ooXzL.jpg",
        cepDoador: "03806020",
        complementoDoador: "52",
        chaveUnicaDoador: "01234567890",
        status: true
      },
      {
        id: "2",
        produto: "Harry Potter e a Camara Secreta",
        categoria: "Livro",
        descricao: "Nova edição",
        fotoProduto: "https://img.travessa.com.br/livro/GR/b4/b41f2d86-3141-4241-bb37-729e2116fc5f.jpg",
        cepDoador: "03306020",
        complementoDoador: "5",
        chaveUnicaDoador: "01234567890",
        status: true
      },
      {
        id: "3",
        produto: "Harry Potter e a Prisioneiro de Askaban",
        categoria: "Livro",
        descricao: "O livro está novo, primeira edição",
        fotoProduto: "https://a-static.mlcdn.com.br/618x463/livro-harry-potter-e-o-prisioneiro-de-azkaban/bondedaleitura/9788532530806/f120660889c96cff96157c32bcee2b8b.jpg",
        cepDoador: "01306020",
        complementoDoador: "52",
        chaveUnicaDoador: "01234567890",
        status: true
      },
      {
        id: "4",
        produto: "Harry Potter e a Cálice de Fogo",
        categoria: "Livro",
        descricao: "Primeira edição",
        fotoProduto: "https://images-na.ssl-images-amazon.com/images/I/8172dLr8Z7L.jpg",
        cepDoador: "03806020",
        complementoDoador: "52",
        chaveUnicaDoador: "01234567890",
        status: true
      }
    ]
    return data;
    //setListDonation(data)
  }

  const response = getDonationList()

  return (
    <>
      <div className="flex gap-2 align-center mt-2 mb-4 content-center">
        <input 
          key={1}
          type="text"
          className="h-8 text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
          placeholder="Busque"
          onChange={(e) => setTextFilter(e.target.value)}
          value={textFilter}
        />
        <MagnifyingGlass size={25} weight="bold" />
      </div>
      <div className="w-screen h-screen -mr-32 grid grid-cols-4 place-items-stretch">
        {response && response.map(donation => {
          return (
            <div className="h-40 w-40 content-center">
              <img src={donation.fotoProduto} alt={donation.produto} />
              <span className="text-zinc-900 font-regular text-sm w-full"> {donation.produto} </span>
            </div>
          )
        })}
      </div>
    </>
  )
}