import { useEffect, useState } from "react"
import { Donation } from "./FormNewDonation"
import { MagnifyingGlass } from "phosphor-react"

import donations from "../../donations.json"
import { Link } from "react-router-dom"

export function DonationListComponent() {
  const [listDonation, setListDonation] = useState<Donation[]>()
  const [textFilter, setTextFilter] = useState("")

  useEffect(() => {
    if (textFilter === "") {
      getDonationList()
    } else {
      filterDonation() 
    }
  }, [textFilter])

  function getDonationList() {
    //pegar do banco os donation
    const data = donations;
    setListDonation(data)
  }

  function filterDonation() {
    let filteredDonationList: Array<Donation> = []
    if (listDonation) {
      listDonation.map((donation) => {
        if (donation.produto.includes(textFilter)) {
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
      <div className="w-screen h-screen grid grid-cols-4 place-items-stretch gap-4">
        {listDonation && listDonation.map(donation => {
          return (
            <Link to={`/donation/${donation.id}`}  key={donation.id} className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-300 hover:ring-sky-300">
              <div key={donation.id} className="w-16 md:w-32 lg:w-48 content-center">
                <img className="w-16 md:w-32 lg:w-48" src={donation.fotoProduto} alt={donation.produto} />
                <span className="text-zinc-900 font-medium text-sm w-full">
                  {donation.produto}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}