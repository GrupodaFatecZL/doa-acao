import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";
import logoAzul from '../assets/logotipo-fundo-azul.svg'
import { LoginComponent } from '../components/LoginComponent'

export function Login() {
  return (
    <>
      <button
        type="button"
        className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-100"
      >
        <Link to="/">
          <ArrowLeft weight="bold" className="w-8 h-8" />
        </Link>
      </button>
      <header className="absolute right-4 md:top-3 md:right-8 flex flex-col">
        <img src={logoAzul} alt="logotipo-fundo-azul" className="mt-1"/>
      </header>
      <div className="bg-[#01C0D5]  text-zinc-300 flex w-screen h-screen justify-center items-center content-center">
        <LoginComponent />
      </div>
    </>
  )
}