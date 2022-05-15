import { Navigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { User } from "../../interfaces/interfaces"
import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../services/firebaseConfig";



export function LoginWithGoogle(): JSX.Element {
  const auth = getAuth(app);
	const [user, setUser] = useState<User | null>();


  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);

		if (result.user) {
			const { displayName, email, uid } = result.user;

			if (!displayName || !email) {
				throw new Error('Missing information from Google Account');
			}
			console.log(result.user)
			setUser ({
				chaveUnica: uid,
				nome: displayName,
				email: email
			})
		}
  }


  async function handleLoginFromGoogle() {
    await signInGoogle();
  }

  if (!user) {
    return <GoogleButton
      type="light"
      label="Logar com o Google"
      onClick={handleLoginFromGoogle} 
    />;
  } else {
    return <Navigate to="/welcome" />;
  }
}