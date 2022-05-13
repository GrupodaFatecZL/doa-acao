import { AuthGoogleContext } from "../contexts/authGoogle";
import { useContext } from 'react';

export function useAuth() {
    const auth = useContext(AuthGoogleContext);
    
    return auth;
}