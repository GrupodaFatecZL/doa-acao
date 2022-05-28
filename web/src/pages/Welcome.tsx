
import logoBranco from '../assets/logotipo-fundo-branco.svg'
import apertoDeMao from '../assets/aperto-de-mao.svg'
import { Menu } from '../components/Menu'
import { useNavigate } from 'react-router'
import { userStorage, UsersDataResponse } from '../interfaces/interfaces';
import { getOneUser } from '../../server/api';
import { useEffect } from 'react';

export function Welcome() {
  let navigate = useNavigate();
  
  useEffect(() => {
    async function setUserStorage() {
      await getUserCurrent()
    }

    setUserStorage()
  }, [])

  const getUserCurrent = async () => {
    const storageUser: userStorage = JSON.parse(sessionStorage.getItem('@users:user') || "");
    if (!storageUser.idUser || storageUser.idUser !== "") {
      const user: UsersDataResponse = await getOneUser(`email=${storageUser.email}`);
      if (user) {
        sessionStorage.setItem('@users:user', JSON.stringify(user));
      }
    }
  }

  return (
    <>
      <Menu />
      <header className="bg-[#FFFFFF] mb-8 absolute right-4 md:top-3 md:right-8 flex flex-col">
        <img src={logoBranco} alt="logotipo-fundo-branco" />
      </header>
      <div className="bg-[#FFFFFF] text-zinc-800 flex w-screen h-screen justify-center items-center content-center">
        <div className="text-center">
          <h2 className="mb-6 text-xl font-semibold">
            Seja Bem-vindo(a)!
          </h2>
          <p>Este site tem como objetivo ajudar na</p>
          <p>intersecção entre alguém que deseja doar</p>
          <p>algo que não utiliza mais, e alguém</p>
          <p>que necessita de uma doação.</p>

          <div className="mt-6 mb-6 w-full flex justify-center content-center gap-2">
            <img src={apertoDeMao} alt="aperto-de-mao" />
          </div>
          <button
            type="button"
            className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#01C0D5] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
            onClick={() => navigate("/new-donation", { replace: true })}
          >
            Desejo doar algo
          </button>
          <button
            type="button"
            className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#01C0D5] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
            onClick={() => navigate("/donation-list", { replace: true })}
          >
            Preciso de doação
          </button>
        </div>
      </div>
    </>
  )
}