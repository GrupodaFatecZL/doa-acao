
import logoImg from '../assets/images/logotipo.png';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/home.css';


export function Home() {

  return (
    <div id="page-home">
      <img src={logoImg} alt="Logotipo DoaAção" className="logotipo"/>
      <div className="form">
        <main>
          <h2> Login </h2>
          <div className="main-content">
            <button className="create-user">
              <img className="logoGoogle" src={googleIconImg} alt="Logo do google" />
              Logar com Google
            </button>
            <div className="separator"> 
              Faça um cadastro 
            </div>
            <input
              type="text"
              placeholder="Digite seu email"
            />
            <button className="create-account">
              Criar conta
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
