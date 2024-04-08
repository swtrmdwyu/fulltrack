import { InputContainer, SelectContainer, SelectListContainer, StyledButton } from "./style";
import arrow from "../../assets/icons/arrow-select.svg"
import { useEffect, useRef, useState } from "react";

interface SelectProps {
    label?: string;
    options: string[]
}

export default function Select({ options, label }: SelectProps) {
    const [showList, setShowList] = useState(false);
    const [value, setValue] = useState("");
 
    const handleClick = () => {
        setShowList((previous) => !previous);
    } 

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        target.scrollBy(0, event.deltaY);
    };

    const handleChangeValue = (value: string) => {
        setValue(value);
    };

    return (
        <SelectContainer>
            <InputContainer>
                <label>{label}</label>
                <input
                    placeholder="Selecione..."
                    value={value}
                />
                <StyledButton onClick={handleClick} $showList={showList} ><img src={arrow} /></StyledButton>
            </InputContainer>

            {showList && 
                <SelectListContainer onWheel={handleWheel}>
                    <ul>
                        {options.map((option: string, idx) => (
                            <li 
                                key={idx}
                                onClick={() => {
                                    handleClick();
                                    handleChangeValue(option);
                                }}
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