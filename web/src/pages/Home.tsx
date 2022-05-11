import { User } from "phosphor-react";
import { Link } from 'react-router-dom'
import logoBranco from '../assets/logotipo-fundo-branco.svg'


export function Home() {
  return (
    <>
      <header className="w-screen flex justify-between items-center">
        <Link to="/login">
          <button
            type="button"
            className="order-none ml-1 w-32 h-8 border-cyan-400 rounded-md flex justify-between items-center gap-1 text-sm text-[#01C0D5] font-medium hover:bg-[#01C0D5] hover:text-zinc-100 transition-colors"
          >
            <User size={22} color="#01C0D5" weight="regular" className="ml-4"/>
            <div className="mr-6"> Entrar </div>
          </button>
        </Link>
        <img src={logoBranco} alt="logotipo-fundo-branco" className="order-last mr-1 h-15 w-15"/>
      </header>
      
        <h1 > Home </h1>
      
    </>
  )
}