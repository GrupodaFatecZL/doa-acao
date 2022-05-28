import { useParams } from "react-router";
import logoBranco from '../assets/logotipo-fundo-branco.svg'
import { Menu } from "../components/Menu";
import { DonationIdComponent } from "../components/DonationIdComponent";


export function DonationId() {
  const { id } = useParams();

  return (
    <>
      <Menu />
      <header className="flex flex-row-reverse space-x-4 space-x-reverse">
        <img src={logoBranco} alt="logotipo-fundo-branco" />
      </header>
      <div className="bg-[#FFFFFF] text-zinc-800 flex justify-center items-center content-center flex-col space-y-3">
        <DonationIdComponent donationId={ id } />  
      </div>
    </>
  )
}