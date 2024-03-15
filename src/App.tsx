import moment from "moment";
import "moment/dist/locale/pt-br";
import "moment/dist/locale/es";
import "./styles/variables.css";
import checkUserLanguage from "./utils/checkUserlanguage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Tests from "./pages/Testes/Tests";

export default function App() {
  const userLanguage = checkUserLanguage()
  moment.locale(userLanguage);

  return (
    <Home />
  )
}
