import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


const clientGoogleId = import.meta.env.VITE_CLIENT_ID_GOOGLE 

export function LoginComponent() {
  let navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [starLogin, setStarLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStarLogin(true);
    if (login.length > 0 && senha.length > 0) { 
      navigate("/welcome", { replace: true });
    }
    

    // fazer get no banco e verificar se a senha e o login estão corretos
  }

  // function handleGoogleLogin(response: GoogleLoginResponseOffline | GoogleLoginResponse): void {
  //   console.log(response);
  //   try {
  //     if ("profileObj" in response) {
  //       const {
  //         profileObj: { name, email, googleId },
  //       } = response;
  //       setName(name);
  //       setEmail(email);
  //       setGoogleId(googleId);
  //       setIsLoggedIn(true);
  //       navigate("/welcome", { replace: true });
  //     }
  //     // fazer get no banco e verificar se já existe esse usuário pelo email, senão devemos salvar
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  
  return (
    <div className="bg-white max-w-sm p-4 border-8 rounded-md border-transparent flex-1 justify-center items-center text-center">
      <header>
        <span className="leading-6 text-zinc-900 font-medium text-xl">
          Login
        </span>
      </header>

      <form onSubmit={handleSubmitLogin} className="my-4 w-full">
        <input
          type="text"
          className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
          placeholder="Digite seu CPF ou Email"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        { starLogin && login === "" &&
          <span className="text-sm font-light max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Para entrar é necessário colocar um login válido
          </span>
        }
        <input
          type="password"
          className="mt-2 mb-3 min-w-[304px] w-full min-h-[20px] text-sm placeholder-slate-400 text-slate-600 border-slate-300 bg-transparent rounded-md focus:outline-none focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 resize-none"
          placeholder="Digite sua senha"
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
        />
        { starLogin && senha === "" &&
          <span className="text-sm font-light max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-red-600">
            Ops.. Você esqueceu de digitar sua senha
          </span>
        }
        <button
          type="submit"
          disabled={(!senha && senha.length > 5) || (!login && login.length > 5)}
          className="mt-4 mb-4 min-w-[304px] w-full min-h-[20px] p-2 bg-[#01C0D5] rounded-md border-transparent flex-1 flex justify-center items-center text-sm text-zinc-100 font-medium hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-500"
        >
          Acessar cadastro
        </button>
        {/* <GoogleLogin
          clientId={clientGoogleId}
          buttonText="Logar com Google"
          onSuccess={handleGoogleLogin}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        /> */}
        <br></br>
        <Link to="/create-user" className="leading-6 mt-3 text-sm text-center text-[#01C0D5] font-medium">
          Criar conta
        </Link>
      </form>
    </div>
  )
}