import moment from "moment";
import "moment/dist/locale/pt-br";
import "moment/dist/locale/es";
import "./styles/variables.css";
import checkUserLanguage from "./utils/checkUserlanguage";
import AppRoutes from "./Routes/AppRoutes";
import AuthProvider, { AuthContext } from "./hooks/AuthContext";
import { useContext } from "react";

export default function App() {
  const userLanguage = checkUserLanguage()
  moment.locale(userLanguage);

  const token = localStorage.getItem("token");

  if(!token) {

  }
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>

  );
}
