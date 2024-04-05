import { StyledForm } from "./style";

export interface FormProps {
    /**
     * Recebe elementos filhos que serão renderizados dentro do formulário.
     */
    children?: React.ReactNode,
    /**
     * Função disparada quando o formulário for enviado.
     */
    onSubmit?: (arg1: React.FormEvent<HTMLFormElement>) => void,
}

export default function Form({ children, onSubmit}: FormProps) {
    return(
        <StyledForm onSubmit={onSubmit}>
            {children}
        </StyledForm>
    );
}