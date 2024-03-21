import { createContext, useState } from "react";
import AuthTokens from "../interfaces/AuthTokens";

interface AuthContextType {
    /**
     * Objeto com os tokens de autenticação.
     */
    authTokens: AuthTokens | null,
    /**
     * Atribui token ao estado dos tokens.
     */
    setTokens: (authTokens: AuthTokens) => void,
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider =({ children }: { children: React.ReactNode}) => {
    const verifyStorage = (): AuthTokens | null => {
        const storageTokens = localStorage.getItem("authTokens");

        if(storageTokens) {
            const authTokensObj: AuthTokens = JSON.parse(storageTokens);
            return authTokensObj;
        }

        return null;
    }

    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(verifyStorage());

    const setTokens = (authTokens: AuthTokens) => {
        setAuthTokens(authTokens);
    }

    return (
        <AuthContext.Provider value={{authTokens, setTokens}}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext};