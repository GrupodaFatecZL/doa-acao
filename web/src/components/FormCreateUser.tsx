import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FindCEP } from "../../server/findAddress"
import { Loading } from "./Loading";
import { User, Address } from "../interfaces/interfaces"



export function FormCreateUser() {
  let navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");

  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");

  const [address, setAddress] = useState<Address | undefined>();
  const [sentUser, setSentUser] = useState(false);
  const [user, setUser] = useState<User>()

  const [isLoadingSend, setIsLoadingSend] = useState(false)

  useEffect(() => {
    handleCep(cep)
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
    setSentUser(true)
    event.preventDefault();
  }


  async function handleUser() {
    setIsLoadingSend(true)

    setUser({
      nome: nome,
      celular: celular,
      cpf: cpf,
      email: email,
      senha: senha,
      cep: cep,
      complemento: complemento
    })

    await sendBD(user)
  }

  async function sendBD(user: User | undefined): Promise<void> {
    if (user) {
      setIsLoadingSend(false)
      setUser(undefined)
      navigate("/welcome", { replace: true });
      // chamar a função para enviar para banco de dados
    }

  }


  return (
    <form onSubmit={handleSubmitForm} className="my-4 w-[60%] flex-col">
      <span className="text-zinc-900 font-regular text-sm">
        Nome completo:
      </span>
      {sentUser && nome === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu nome completo
          </span>
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
      {sentUser && !celular &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu celular
          </span>
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
      {sentUser && !cpf &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu CPF sem pontos e traços
          </span>
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
      {sentUser && !email &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu email
          </span>
        </>
      }
      <input
        key={4}
        type="email"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite um email ainda não cadastrado"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <span className="text-zinc-900 font-regular text-sm">
        Senha:
      </span>
      {sentUser && !senha &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha uma nova senha
          </span>
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
      { sentUser && senhaConfirmada.length == 0 &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha a senha digita acima
          </span>
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
      {sentUser && cep.length === 0 &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu CEP corretamente
          </span>
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
          {sentUser && complemento.length === 0 &&
            <>
              <br></br>
              <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
                Por gentileza, preencha seu Complemento
              </span>
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


      <button
        type="submit"
        className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#01C0D5] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
        onClick={handleUser}
      >
        {isLoadingSend ? <Loading /> : "Salvar"}
      </button>
    </form>
  )
}