import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import { ButtonContainer, LoginContainer } from "./style";
import logo from "../../assets/img/logo.svg";
import { useState } from "react";
import getToken from "../../services/getToken";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmailValue = event.target.value;
        setEmail(newEmailValue);
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPasswordValue = event.target.value;
        setPassword(newPasswordValue);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await getToken();
        console.log(token)
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
