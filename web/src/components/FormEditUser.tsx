import { useState, useEffect } from "react";
import { FindCEP } from "../../server/findAddress"
import { Loading } from "./Loading"
import { Address, User } from "../interfaces/interfaces"
import { Trash, Pencil } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUserByEmail } from "../../server/api"


type userStorage = {
  nome: string;
  email: string;
  celular?: string;
  cep?: string;
  complemento?: string;
  cpf?: string;
  senha?: string;
}

export function FormEditUser() {
  let navigate = useNavigate();
  const storageUser: userStorage = JSON.parse(sessionStorage.getItem('@users:user') || "");

  const [nome, setNome] = useState(storageUser?.nome || "");
  const [celular, setCelular] = useState(storageUser?.celular || "");
  const [cpf, setCpf] = useState(storageUser?.cpf || "");
  const [email, setEmail] = useState(storageUser?.email || "");
  const [senha, setSenha] = useState(storageUser?.senha || "");
  const [senhaConfirmada, setSenhaConfirmada] = useState(storageUser?.senha || "");
  const [cep, setCep] = useState(storageUser?.cep || "");
  const [complemento, setComplemento] = useState(storageUser?.complemento || "");
  const [address, setAddress] = useState<Address | undefined>();
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoadingSend, setIsLoadingSend] = useState(false)

  useEffect(() => {
    if (cep) {
      handleCep(cep)
    }
  }, [cep])


  useEffect(() => {
    if (senha.length <= senhaConfirmada.length && senha !== senhaConfirmada) {
      alert("As senhas estão diferentes tente novamente")
      setSenha("")
      setSenhaConfirmada("")
    }
  }, [senhaConfirmada])

  async function handleCep(cep: string) {
    if (cep.length === 8) {
      const response: Address | undefined = await FindCEP(cep)
      if (response !== undefined) {
        setAddress(response)
      }
    }
  }

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function updateBD(): Promise<void> {
    setIsLoadingSend(true)
    const user = {
      nome: nome,
      celular: celular,
      cpf: cpf,
      email: email,
      senha: senha,
      cep: cep,
      complemento: complemento
    }

    let validationUpdate = []
    for (let i = 0; i < Object.entries(user).length; i++) {
      if (Object.entries(user)[i][1] === '') {
        validationUpdate.push(Object.entries(user)[i])
        setIsEmpty(true)
        setIsLoadingSend(false)
      }
    }

    if (user && validationUpdate.length <= 0) {
      updateUser(user).then((resp) => {
        setIsLoadingSend(false)
        navigate("/welcome", { replace: true });
      }).catch((err) => {
        alert("Desculpe, mas acontenceu um erro")
        setIsLoadingSend(false)
        console.log(err)
      })
    }

    
  }


  async function deleteBD(): Promise<void> {
    setIsLoadingSend(true)
    const user = {
      nome: nome,
      celular: celular,
      cpf: cpf,
      email: email,
      senha: senha,
      cep: cep,
      complemento: complemento
    }


    if (user.email) {
      deleteUserByEmail(user.email.toString()).then(() => {
        setIsLoadingSend(false)
        navigate("/", { replace: true });
      }).catch((err) => {
        alert("Desculpe, mas acontenceu um erro")
        setIsLoadingSend(false)
        console.log(err)
      })
    }
  }


  return (
    <form onSubmit={handleSubmitForm} className="my-4 w-[60%] flex-col">
      <span className="text-zinc-900 font-regular text-sm">
        Nome completo:
      </span>
      {isEmpty && nome === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu nome completo
          </span>
          <br></br>
        </>
      }
      <input
        key={1}
        type="text"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite seu nome completo"
        onChange={(e) => setNome(e.target.value)}
        value={nome}
      />

      <span className="text-zinc-900 font-regular text-sm">
        Celular:
      </span>
      {isEmpty && celular === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu celular
          </span>
          <br></br>
        </>
      }
      <input
        key={2}
        type="tel"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite o DDD e o número sem traços"
        onChange={(e) => setCelular(e.target.value)}
        value={celular}
      />

      <span className="text-zinc-900 font-regular text-sm">
        CPF:
      </span>
      {isEmpty && cpf === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu CPF sem pontos e traços
          </span>
          <br></br>
        </>
      }
      <input
        key={3}
        type="text"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite seu CPF sem pontos e traços"
        onChange={(e) => setCpf(e.target.value)}
        value={cpf}
      />

      <span className="text-zinc-900 font-regular text-sm">
        Email:
      </span>

      <>
        <br></br>
        <span className="text-xs italic font-light max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
          Não é possível alterar o email, caso esteja errado, exclua seu cadastrado e faça um novo
        </span>
        <br></br>
      </>

      <input
        key={4}
        type="email"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        disabled={true}
        value={email}
      />

      <span className="text-zinc-900 font-regular text-sm">
        Senha:
      </span>
      {isEmpty && senha === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha uma nova senha
          </span>
          <br></br>
        </>
      }
      <input
        key={5}
        type="password"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="********"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
      />

      <span className="text-zinc-900 font-regular text-sm">
        Confirme a Senha:
      </span>
      {isEmpty && senhaConfirmada === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha a senha digita acima
          </span>
          <br></br>
        </>
      }
      <input
        key={6}
        type="password"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="********"
        onChange={(e) => setSenhaConfirmada(e.target.value)}
        value={senhaConfirmada}
      />

      <span className="text-zinc-900 font-regular text-sm">
        CEP:
      </span>
      {isEmpty && cep === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu CEP corretamente
          </span>
          <br></br>
        </>
      }
      <input
        key={7}
        type="text"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite seu CEP sem traços"
        onChange={(e) => setCep(e.target.value)}
        value={cep}
      />
      {cep && address?.rua &&
        <>
          <span className="text-zinc-900 font-regular text-sm">
            Rua:
          </span>
          <input
            key={8}
            type="text"
            className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
            disabled={true}
            value={address?.rua}
          />

          <span className="text-zinc-900 font-regular text-sm">
            Complemento:
          </span>
          <input
            key={9}
            type="text"
            className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
            onChange={(e) => setComplemento(e.target.value)}
            value={complemento}
          />
          {isEmpty && complemento === "" &&
            <>
              <br></br>
              <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
                Por gentileza, preencha seu Complemento
              </span>
              <br></br>
            </>
          }

          <span className="text-zinc-900 font-regular text-sm">
            Bairro:
          </span>
          <input
            key={10}
            type="text"
            className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
            disabled={true}
            value={address?.bairro}
          />

          <span className="text-zinc-900 font-regular text-sm">
            Cidade:
          </span>
          <input
            key={11}
            type="text"
            className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
            disabled={true}
            value={address?.cidade}
          />

          <span className="text-zinc-900 font-regular text-sm">
            Estado:
          </span>
          <input
            key={12}
            type="text"
            className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
            disabled={true}
            value={address?.estado}
          />
        </>
      }
      <div className="gap-2">
        <button
          type="submit"
          className="mt-4 gap-2 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#e70b0b] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-[#e76c25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
          onClick={deleteBD}
        >
          <Trash size={17} />
          {isLoadingSend ? <Loading /> : "Excluir"}
        </button>
        <button
          type="submit"
          className="mt-4 mb-4 gap-2 min-w-[304px] w-full min-h-[20px] p-2 bg-[#01C0D5] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
          onClick={updateBD}
        >
          <Pencil size={17} />
          {isLoadingSend ? <Loading /> : "Editar"}
        </button>
      </div>
    </form>
  )
}