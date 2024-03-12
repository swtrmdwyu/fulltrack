import { StyledForm } from "./style";

export interface FormProps {
    children?: React.ReactNode,
    onSubmit?: (arg1: React.FormEvent<HTMLFormElement>) => void,
}

export default function Form({ children, onSubmit}: FormProps) {
    return(
        <StyledForm onSubmit={onSubmit}>

            {children}
        </StyledForm>
    );
}