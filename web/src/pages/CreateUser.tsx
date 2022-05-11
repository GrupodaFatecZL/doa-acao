import logoBranco from '../assets/logotipo-fundo-branco.svg'
import { FormCreateUser } from "../components/FormCreateUser";
import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";



export function CreateUser() {
  return (
    <>
      <button
        type="button"
        className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-100"
      >
        <Link to="/login">
          <ArrowLeft weight="bold" className="w-8 h-8" />
        </Link>
      </button>
      <header className="flex flex-row-reverse space-x-4 space-x-reverse">
        <img src={logoBranco} alt="logotipo-fundo-branco" />
      </header>
      <div className="bg-[#FFFFFF] text-zinc-800 flex justify-center items-center content-center flex-col space-y-3">
        <h2 className="text-xl font-semibold">
          Seu cadastro
        </h2>
        <FormCreateUser />
      </div>
    </>
  )
}