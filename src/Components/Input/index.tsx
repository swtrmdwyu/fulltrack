import { InputContainer } from "./style";

export interface InputProps {
    placeholder?: string,
    type?: "text" | "password" | "email" | "date",
    label?: string,
    onChange?: (arg1: React.ChangeEvent<HTMLInputElement>) => void,
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