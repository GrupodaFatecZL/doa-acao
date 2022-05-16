import { useState, createContext, useEffect, ReactNode } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";
import { User } from "../interfaces/interfaces"

type AuthContextType = {
  signed: boolean;
  user: User | undefined;
  signInGoogle: () => Promise<void>;
  signOut: () => JSX.Element;
}


type AuthContextProviderProps = {
	children: ReactNode;
}


export const AuthGoogleProvider = (props: AuthContextProviderProps) => {
  const auth = getAuth(app);

  const [signed, setSigned] = useState(false)
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, email, uid } = user;

				if (!displayName || !email) {
					throw new Error('Missing information from Google Account');
				}

				setUser ({
					chaveUnica: uid,
					nome: displayName,
					email: email
				})

        setSigned(true)
			}
		})

		return () => {
			unsubscribe();
		}
	}, []);


  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);

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
      setSigned(true)
		}
  }

  function signOut() {
    sessionStorage.clear();
    setUser(undefined);
    setSigned(false);
    return <Navigate to="/" />;
  }

  return (
    <AuthContext.Provider
      value={{
        signed: signed,
        user: user,
        signInGoogle: signInGoogle,
        signOut: signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext({} as AuthContextType);