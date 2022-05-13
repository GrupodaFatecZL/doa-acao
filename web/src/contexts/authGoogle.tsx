import { useState, createContext, useEffect, ReactNode } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";

type UserGoogle = {
  signed: boolean;
  user: User | null;
  signInGoogle: () => Promise<void>;
  signOut: () => JSX.Element;
}

type User = {
  id: string;
  name: string | null;
  email: string | null;
}

type AuthContextProviderProps = {
	children: ReactNode;
}

export const AuthGoogleContext = createContext({} as UserGoogle);

export const AuthGoogleProvider = (props: AuthContextProviderProps) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const { displayName, email, uid } = user;

				if (!displayName || !email) {
					throw new Error('Missing information from Google Account');
				}

				setUser ({
					id: uid,
					name: displayName,
					email: email
				})
			}
		})

		return () => {
			unsubscribe();
		}
	}, []);

  async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    debugger
		const result = await signInWithPopup(auth, provider);

		if (result.user) {
			const { displayName, email, uid } = result.user;

			if (!displayName || !email) {
				throw new Error('Missing information from Google Account');
			}

			setUser ({
				id: uid,
				name: displayName,
				email: email
			})
		}
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  }

  return (
    <AuthGoogleContext.Provider
      value={{
        signed: !!user,
        user: user || null,
        signInGoogle,
        signOut,
      }}
    >
      {props.children}
    </AuthGoogleContext.Provider>
  );
};