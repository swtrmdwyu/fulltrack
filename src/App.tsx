import moment from "moment";
import "moment/dist/locale/pt-br";
import "moment/dist/locale/es";
import "./styles/variables.css";
import checkUserLanguage from "./utils/checkUserlanguage";
import Login from "./pages/Login";
import Home from "./pages/Home";


export default function App() {
  const userLanguage = checkUserLanguage()
  moment.locale(userLanguage);

  const token = localStorage.getItem("token");

  if(!token) {
    console.log("ir para login");
  }

  return (
    <Home />
  )
}
