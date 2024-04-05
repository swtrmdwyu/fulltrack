import { StyledButton } from "./style";

export interface ButtonProps {
    /**
     * Define o conteúdo que será renderizado no botão.
     */
    children?: React.ReactNode,
    /**
     * Função chamada quando o botão for clicado.
     */
    onClick?: (arg1: React.MouseEvent<HTMLButtonElement>) => void,
    /**
     * Define qual a variação de tema de cores o botão deve ser.
     */
    theme?: "primary" | "secondary" | "tertiary",
    /**
     * Define o tipo do botão.
     */
    type?: "submit" | "click",
}

export default function Button({ children, onClick, theme, type }: ButtonProps) {
    return (
        <StyledButton
            onClick={onClick}
            theme={theme}
            type={type}
        >
            {children}
        </StyledButton>
    );
}