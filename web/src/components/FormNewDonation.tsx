import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FindCEP } from "../../server/findAddress"
import { Loading } from "./Loading";
import { Address, userStorage, UsersDataResponse } from "../interfaces/interfaces"
import { UploadFile } from "./UploadImage";
import { getOneUser, createProduct } from "../../server/api"



export function FormNewDonation() {
  let navigate = useNavigate();
  const storageUser: userStorage = JSON.parse(sessionStorage.getItem('@users:user') || "");
  
  const [sendDonation, setSendDonation] = useState(false)
  const [address, setAddress] = useState<Address | undefined>();
  const [produto, setProduto] = useState("")
  const [categoria, setCategoria] = useState("")
  const [descricao, setDescricao] = useState("")
  const [fotoProduto, setFotoProduto] = useState("")
  const [chaveUnicaDoador, setChaveUnicaDoador] = useState("")
  const [cepDoador, setCepDoador] = useState("")
  const [complementoDoador, setComplementoDoador] = useState("")
  const [isEmpty, setIsEmpty] = useState(false)
  const [base64, setBase64] = useState<string | ArrayBuffer | null>()

  useEffect(() => {
    verifyChaveUnicaDoador()
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

  async function verifyChaveUnicaDoador() {
    if (!storageUser.idUser) {
      const user: UsersDataResponse = await getOneUser(`email=${storageUser.email}`);
      setChaveUnicaDoador(user.idUser);
      sessionStorage.setItem('@users:user', JSON.stringify(user));
    } else {
      setChaveUnicaDoador(storageUser.idUser);
    }
  }

  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSendDonation(true)

    const donation = {
      produto: produto,
      categoria: categoria,
      descricao: descricao,
      fotoProduto: typeof base64 === 'string' ? base64 : fotoProduto,
      cepDoador: cepDoador,
      complementoDoador: complementoDoador,
      chaveUnicaDoador: chaveUnicaDoador,
      status: true
    }

    let validationCreateProduct = []
    for (let i = 0; i < Object.entries(donation).length; i++) {
      if (Object.entries(donation)[i][1] === '') {
        validationCreateProduct.push(Object.entries(donation)[i])
        setIsEmpty(true)
        setSendDonation(false);
      }
    }

    if(donation && validationCreateProduct.length <= 0) {
      createProduct(donation).then((resp) => {
        setSendDonation(false);
        navigate("/donation-list", { replace: true });
      }).catch((err) => {
        alert("Desculpe, mas acontenceu um erro")
        setSendDonation(false);
        console.log(err)
      })
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
      { isEmpty && produto === "" &&
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
      { isEmpty && categoria === "" &&
        <>
          <br></br>
          <span className="font-regular text-sm max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Por gentileza, preencha uma categoria
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
        <option value="" data-default disabled selected></option>
      </select>

      <span className="text-zinc-900 font-regular text-sm">
        Descrição:
      </span>
      { isEmpty && descricao === "" &&
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
      { isEmpty && cepDoador === "" &&
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
      { cepDoador && address?.rua &&
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
          {isEmpty && complementoDoador.length === 0 &&
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

      <span className="text-zinc-900 font-regular text-sm">
        Foto:
      </span>

      <UploadFile onFileUrlUploaded={setFotoProduto} onFileBase64={setBase64} />

      { isEmpty && fotoProduto === "" &&
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
        { sendDonation ? <Loading /> : "Salvar"}
      </button>
    </form>
  )
}