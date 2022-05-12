import { User } from "phosphor-react";
import { Link } from 'react-router-dom'
import logoBranco from '../assets/logotipo-fundo-branco.svg'
import doar from "../assets/doar.png"
import doacao from "../assets/doacao.png"


export function Home() {
  return (
    <>
      <header className="w-screen flex justify-between items-top">
        <Link to="/login">
          <button
            type="button"
            className="order-none ml-1 mt-2 w-32 h-8 border-cyan-400 rounded-md flex justify-between items-center gap-1 text-sm text-[#01C0D5] font-medium hover:bg-[#01C0D5] hover:text-zinc-100 transition-colors"
          >
            <User size={22} color="#01C0D5" weight="regular" className="ml-4" />
            <div className="mr-6"> Entrar </div>
          </button>
        </Link>
        <img src={logoBranco} alt="logotipo-fundo-branco" className="order-last mr-1 h-15 w-15" />
      </header>

      <div className="bg-[#FFFFFF] flex text-zinc-800 pl-16 md:w-sm lg:w-xl">
        <div className="text-left">
          <h2 className="text-xl font-semibold mb-6">
            Doar faz bem ao coração 💙
          </h2>
          <p>Doar é um ato de amor ao próximo, faz</p>
          <p>bem a quem doa e também a quem recebe.</p>

          <p className="leading-8 mt-4">Está precisando de algo?
            <a href="/login" className="font-medium"> Acesse nossa área logada </a>
            quem não tem alguém doando 🤩
          </p>
          <p className="leading-8">Tem algo que não usa mais?
            <a href="/login" className="font-medium"> Acesse nossa área logada </a>
            e dê a oportunidade para alguém que esteja precisando 🥳
          </p>
        </div>
      </div>
      <div className="w-screen mt-8 flex justify-center content-center bg-[#01C0D5]">
        <img src={doacao} alt="receba" className="w-16 md:w-32 lg:w-64" />
      </div>
    </>
  )
}