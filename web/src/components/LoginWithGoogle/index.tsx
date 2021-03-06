import { Navigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { UsersDataResponse } from "../../interfaces/interfaces"
import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../services/firebaseConfig";
import { createUser, getOneUser } from "../../../server/api"



export function LoginWithGoogle(): JSX.Element {
  const auth = getAuth(app);
	const [user, setUser] = useState(false);

  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
    
		if (result.user) {
			const { displayName, email } = result.user;

			if (!displayName || !email) {
				throw new Error('Missing information from Google Account');
			}
			
			setUser(true)
      const users: UsersDataResponse = await getOneUser(`email=${email}`)
      if (!users) {
        await createUser({
          nome: displayName,
          email: email
        })
      } 

      sessionStorage.setItem('@users:user', JSON.stringify(users ? users : {
        nome: displayName,
        email: email
      }));
		}
  }


  if (!user) {
    return <GoogleButton
      type="light"
      label="Logar com o Google"
      onClick={signInGoogle} 
    />;
  } else {
    return <Navigate to="/welcome" />;
  }
}