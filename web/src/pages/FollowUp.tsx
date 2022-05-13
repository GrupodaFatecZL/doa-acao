import logoBranco from '../assets/logotipo-fundo-branco.svg'
import { FollowUpComponent } from '../components/FollowUpComponent';
import { Menu } from "../components/Menu";

export function FollowUp () {
  return (
    <>
      <Menu />
      <header className="flex flex-row-reverse space-x-4 space-x-reverse">
        <img src={logoBranco} alt="logotipo-fundo-branco" />
      </header>
      <div className="bg-[#FFFFFF] text-zinc-800 flex justify-center items-center content-center flex-col space-y-3">
        <FollowUpComponent />
      </div>
    </>
  )
}