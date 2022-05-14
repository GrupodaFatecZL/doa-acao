import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import GoogleButton from 'react-google-button'

import { useState, createContext, useEffect, ReactNode } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../services/firebaseConfig";

type User = {
  id: string;
  name: string | null;
  email: string | null;
}

export function LoginWithGoogle(): JSX.Element {
  //const { signInGoogle, signed } = useAuth();


  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
	// 		if (user) {
	// 			const { displayName, email, uid } = user;

	// 			if (!displayName || !email) {
	// 				throw new Error('Missing information from Google Account');
	// 			}

	// 			setUser ({
	// 				id: uid,
	// 				name: displayName,
	// 				email: email
	// 			})
	// 		}
	// 	})

	// 	return () => {
	// 		unsubscribe();
	// 	}
	// }, []);

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
				id: uid,
				name: displayName,
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