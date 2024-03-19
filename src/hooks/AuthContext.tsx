import {createContext, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode,
}

type AuthTokens = {token: string, refresh: string} | null;

interface AuthContextType {
    authTokens: AuthTokens;
    setAuthTokens: (tokens: AuthTokens) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
    const [authTokens, setAuthTokens] = useState<AuthTokens>(null);

    const contextValue: AuthContextType = {
        authTokens,
        setAuthTokens,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}