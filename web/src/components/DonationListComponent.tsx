import { useEffect, useState } from "react"
import { ProductDataResponse, userStorage } from "../interfaces/interfaces"
import { MagnifyingGlass } from "phosphor-react"
import { Link } from "react-router-dom"
import { getProducts } from "../../server/api"

export function DonationListComponent() {
  const userLogin: userStorage  = JSON.parse(sessionStorage.getItem('@users:user') || "");
  const [listDonation, setListDonation] = useState<ProductDataResponse[]>()
  const [textFilter, setTextFilter] = useState("")

  useEffect(() => {
    if (textFilter === "") {
      getDonationList()
    } else {
      filterDonation() 
    }
  }, [textFilter])

  async function getDonationList() {
    const data: ProductDataResponse[] = await getProducts();
    setListDonation(data)
  }

  async function filterDonation() {
    let filteredDonationList: Array<ProductDataResponse> = []
    if (listDonation) {
      listDonation.map((donation) => {
        let nameDonation = donation.produto.toLowerCase()
        if (nameDonation.includes(textFilter.toLowerCase())) {
          filteredDonationList.push(donation)
        }
      })
    }
    setListDonation(filteredDonationList)
  }


  return (
    <>
      <div className="mt-2 mb-4 flex gap-2 align-center justify-center items-center content-center">
        <input
          key={1}
          type="text"
          className="text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
          placeholder="Busque"
          onChange={(e) => setTextFilter(e.target.value)}
          value={textFilter}
        />
        <button type="button" onClick={() => setTextFilter("")} className="rounded-lg  hover:bg-sky-300 hover:ring-sky-300">
          <MagnifyingGlass size={25} weight="bold" />
        </button> 
      </div>
      <div className="w-screen grid grid-cols-4 place-items-stretch gap-4">
        {listDonation && listDonation.map(donation => {
          if (donation.status === true && donation.chaveUnicaDoador !== userLogin?.idUser) {
            return (
              <Link to={`/donation/${donation.idProduct}`}  key={donation.idProduct} className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-300 hover:ring-sky-300">
                <div key={donation.idProduct} className="w-16 md:w-32 lg:w-48 content-center">
                  <img className="w-16 md:w-32 lg:w-48" src={donation.fotoProduto} alt={donation.produto} />
                  <span className="text-zinc-900 font-medium text-sm w-full">
                    {donation.produto}
                  </span>
                </div>
              </Link>
            )
          }
        })}
      </div>
    </>
  )
}