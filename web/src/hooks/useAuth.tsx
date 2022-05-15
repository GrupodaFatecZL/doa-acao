import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';

export function useAuth() {
    const auth = useContext(AuthContext);
    
    return auth;
}