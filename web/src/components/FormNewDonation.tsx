import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FindCEP } from "../../server/findAddress"
import { Loading } from "./Loading";
import { Address, Product } from "../interfaces/interfaces"
import { UploadFile } from "./UploadImage";



export function FormNewDonation() {
  let navigate = useNavigate();

  const [sendDonation, setSendDonation] = useState(false)

  const [donation, setDonation] = useState<Product>()
  const [address, setAddress] = useState<Address | undefined>();

  const [produto, setProduto] = useState("")
  const [categoria, setCategoria] = useState("")
  const [descricao, setDescricao] = useState("")
  const [fotoProduto, setFotoProduto] = useState("")

  const [cepDoador, setCepDoador] = useState("")
  const [complementoDoador, setComplementoDoador] = useState("")
  const [chaveUnicaDoador, setChaveUnicaDoador] = useState("")

  const [file, setFile] = useState<File>()


  useEffect(() => {
    handleCep(cepDoador)
  }, [cepDoador])

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
    setSendDonation(true)
    setDonation({
      produto: produto,
      categoria: categoria,
      descricao: descricao,
      fotoProduto: fotoProduto,
      cepDoador: cepDoador,
      complementoDoador: complementoDoador,
      chaveUnicaDoador: chaveUnicaDoador,
      status: true
    })
    setSendDonation(false);


    console.log({
      produto: produto,
      categoria: categoria,
      descricao: descricao,
      fotoProduto: fotoProduto,
      cepDoador: cepDoador,
      complementoDoador: complementoDoador,
      chaveUnicaDoador: chaveUnicaDoador,
      status: true
    })

    console.log(file)
  }

  async function sendBD(donation: Product | undefined): Promise<void> {
    if (donation) {

      navigate("/donation-list", { replace: true });
      // chamar a função para enviar para banco de dados
    }
  }

  const optionsCategory = {
    livro: {
      text: "Livro", value: "livro"
    },
    roupa: {
      text: "Roupa", value: "roupa"
    },
    calcados: {
      text: "Calçados", value: "calçados"
    },
    utensilios: {
      text: "Utensilios", value: "utensilios"
    },
    eletrodomesticos: {
      text: "Eletrodomésticos", value: "eletrodomesticos"
    },
    eletronicos: {
      text: "Eletrônicos", value: "eletronicos"
    },
    moveis: {
      text: "Móveis", value: "moveis"
    },
    outros: {
      text: "Outros", value: "outros"
    }
  }

  return (
    <form onSubmit={handleSubmitForm} className="my-4 w-[60%] flex-col">
      <span className="text-zinc-900 font-regular text-sm">
        Nome do produto:
      </span>
      {sendDonation && produto === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha o nome do produto
          </span>
        </>
      }
      <input
        key={1}
        type="text"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite o nome do produto"
        onChange={(e) => setProduto(e.target.value)}
        value={produto}
      />

      <span className="text-zinc-900 font-regular text-sm">
        Categoria:
      </span>
      {sendDonation && !categoria &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha seu celular
          </span>
        </>
      }
      <select
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Selecione a categoria do produto"
        onChange={(e) => setCategoria(e.target.value)}
        value={categoria}
      >
        {Object.entries(optionsCategory).map(([key, items]) => {
          return (
            <option value={items.value} key={key}>
              {items.text}
            </option>
          )
        })
        }
      </select>

      <span className="text-zinc-900 font-regular text-sm">
        Descrição:
      </span>
      {sendDonation && !descricao &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha alguma descrição
          </span>
        </>
      }
      <textarea
        key={3}
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[40px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite uma descrição sobre o produto"
        onChange={(e) => setDescricao(e.target.value)}
        value={descricao}
      />

      <span className="text-zinc-900 font-regular text-sm">
        CEP:
      </span>
      {sendDonation && !cepDoador &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha o CEP para retirada do produto
          </span>
        </>
      }
      <input
        key={4}
        type="text"
        className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
        placeholder="Digite o CEP para retirada do produto"
        onChange={(e) => setCepDoador(e.target.value)}
        value={cepDoador}
      />
      {cepDoador && address?.rua &&
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
            onChange={(e) => setComplementoDoador(e.target.value)}
            value={complementoDoador}
          />
          {sendDonation && complementoDoador.length === 0 &&
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

      <span className="text-zinc-900 font-regular text-sm">
        Foto:
      </span>

      <UploadFile onFileUploaded={setFile} onFileUrlUploaded={setFotoProduto} />

      { sendDonation && !fotoProduto &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, coloque uma foto
          </span>
        </>
      }
      
      <button
        type="submit"
        className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#01C0D5] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
      >
        {sendDonation ? <Loading /> : "Salvar"}
      </button>
    </form>
  )
}