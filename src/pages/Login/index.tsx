import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import { ButtonContainer, LoginContainer } from "./style";
import logo from "../../assets/img/logo.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getAuthTokens from "../../services/getAuthTokens";
import getVehicles from "../../services/getVehicles";

export default function Login() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {authTokens, setTokens} = useContext(AuthContext);

    const navigate = useNavigate();

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
        if(authTokens) {
            const vehicles = await getVehicles(authTokens?.authToken);
            console.log(vehicles)
        }

        // const authTokens = await getAuthTokens();
        
        // if(authTokens) {
        //     setTokens(authTokens);
        //     localStorage.setItem("authTokens", JSON.stringify(authTokens));
        //     navigate("/");
        // }
    }

    return( 
        <LoginContainer>
            <Form onSubmit={handleSubmit}>
                <img src={logo} alt={("fulltime_log_alt")} />
                <Input 
                    placeholder={t("login.form_field.email.placeholder")}
                    label="Email:"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                />
                <Input 
                    placeholder={t("login.form_field.password.placeholder")}
                    label={t("login.form_field.password.label")}
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                />
                <ButtonContainer>
                    <Button
                        type="submit"
                        theme="primary"
                        
                    >
                        {t("login.login_button")}
                    </Button>
                </ButtonContainer>
            </Form>
        </LoginContainer>
    )
}
