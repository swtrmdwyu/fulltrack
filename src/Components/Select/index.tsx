import { InputContainer, SelectContainer, SelectListContainer, StyledButton } from "./style";
import arrow from "../../assets/icons/arrow-select.svg";
import { useState } from "react";

interface SelectProps {
    label?: string,
    options: string[],
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSetValue: (value: string) => void
    value: string
}

export default function Select({ options, label, value, onChange, onSetValue}: SelectProps) {
    const [showList, setShowList] = useState(false);

    const toogleArrow = () => {
        setShowList((previous) => !previous);
    };

    const handleSetValue = (value: string) => {
        toogleArrow();
        if(onSetValue) onSetValue(value);
    };

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!showList) {
            toogleArrow();
        }

        if(onChange) onChange(event);
    };

    return (
        <SelectContainer>
            <InputContainer>
                <label>{label}</label>
                <input
                    placeholder="Selecione..."
                    value={value}
                    onChange={onChangeValue}
                />
                <StyledButton 
                    onClick={toogleArrow} 
                    $showList={showList}
                    >
                        <img src={arrow} />
                    </StyledButton>
            </InputContainer>

            {showList && 
                <SelectListContainer>
                    <ul>
                        {options.map((option: string, idx) => (
                            <li 
                                key={idx}
                                onClick={() => handleSetValue(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </SelectListContainer>
            }


        </SelectContainer>
    );
}