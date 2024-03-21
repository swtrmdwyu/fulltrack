import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { authTokens } = useContext(AuthContext);
    
    return (
        authTokens ? children : <Navigate to="/login" />
    );
}