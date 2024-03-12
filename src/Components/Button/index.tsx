import { StyledButton } from "./style";

export interface ButtonProps {
    children?: React.ReactNode,
    onClick?: (arg1: React.MouseEvent<HTMLButtonElement>) => void,
    theme?: "primary" | "secondary" | "tertiary",
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