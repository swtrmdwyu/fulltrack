import { InputContainer } from "./style";

export interface InputProps {
    /**
     * Define o texto que será exibido na label do input.
     */
    label?: string,
    /**
     * Função disparada quando houver alterações no valor do input.
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    /**
     * Define o texto exibido no placeholder do input.
     */
    placeholder?: string,
    /**
     * Determina qual a variaçõa de tipo o input deve possuir.
     */
    type?: "text" | "password" | "email" | "date",
    /**
     * Define o valor do input.
     */
    value?: string
}

export default function Input({ placeholder, type, label, onChange, value }: InputProps) {
    return (
        <InputContainer>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </InputContainer>
    );
}