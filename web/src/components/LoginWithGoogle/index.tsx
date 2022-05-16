import { Navigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { User, UsersDataResponse } from "../../interfaces/interfaces"
import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../services/firebaseConfig";
import { createUser, getUser } from "../../../server/api"



export function LoginWithGoogle(): JSX.Element {
  const auth = getAuth(app);
	const [user, setUser] = useState<User | null>();


  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
    const users: UsersDataResponse[] = await getUser()

		if (result.user) {
			const { displayName, email, uid } = result.user;

			if (!displayName || !email) {
				throw new Error('Missing information from Google Account');
			}
			
			setUser ({
				chaveUnica: uid,
				nome: displayName,
				email: email
			})
      debugger
      const hasUserInBD = users.find(user => user.chaveUnica === uid || user.email === email)

      if (!hasUserInBD) {
        await createUser({
          nome: displayName,
          chaveUnica: uid.toString(),
          email: email
        })
      }
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