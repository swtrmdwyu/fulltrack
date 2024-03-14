import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import { ButtonContainer, LoginContainer } from "./style";
import logo from "../../assets/img/logo.svg";
import { useState } from "react";
import { IUser } from "../../interfaces/IUser";
import api from "../../config/api";

export default function Login() {
    const [ token, setToken ] = useState(null);
    const [ user, setUser ] = useState<IUser | null>(null);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const params = {
        grant_type: "session_credentials",
        client_id: "web_fulltrack_3",
        client_secret: "6648ee7559e05d1549afb7d1694b6d822dd2a831",
        user_id: 104317 
    };

    const getToken = () => {
        api.get("token", {params})
            .then((res) => { console.log(res)})
            .catch((err) => console.log(err))
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmailValue = event.target.value;
        setEmail(newEmailValue);
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPasswordValue = event.target.value;
        setPassword(newPasswordValue);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        getToken();
    }

    return( 
        <LoginContainer>
            <Form onSubmit={handleSubmit}>
                <img src={logo} alt="Logo fulltime" />
                <Input 
                    placeholder="Digite seu email"
                    label="Email:"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                />
                <Input 
                    placeholder="Digite sua senha"
                    label="Senha:"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
                <ButtonContainer>
                    <Button
                        type="submit"
                        theme="primary"
                        
                    >
                        Entrar
                    </Button>
                </ButtonContainer>
            </Form>
        </LoginContainer>
    )
}