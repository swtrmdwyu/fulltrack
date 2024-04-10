import { useContext, useRef, useState } from "react";
import { Color, ColorsBox, SelectButton, SelectColorsContainer } from "./style";
import arrow from "../../assets/icons/arrow-select.svg";
import { LandmarkContext } from "../../Contexts/LandmarkContext";

export interface SelectColorProps {
    /**
     * Função usada para salvar a cor selecionada em um estado.
     */
    setColor: () => void
}

export default function SelectColor({ setColor }: SelectColorProps) {
    const [showColors, setShowColors] = useState(false);
    const [active, setActive] = useState(0);
    const { setCurrentColor } = useContext(LandmarkContext);

    const colorRef = useRef<HTMLDivElement | null>(null);

    const handleButtonClick = () => {
        setShowColors((previous) => !previous);
    }

    const handleSetColor = (color: string, idx: number) => {
        setActive(idx);
        setCurrentColor(color);
    }

    const colors = [
        "var(--custom-color-gray)",
        "var(--custom-color-blue)",
        "var(--custom-color-cyan)",
        "var(--custom-color-green)",
        "var(--custom-color-yellow)",
        "var(--custom-color-orange)",
        "var(--custom-color-red)",
        "var(--custom-color-purple)",
        "var(--custom-color-violet)"
    ]

    return (
        <SelectColorsContainer>
            <SelectButton 
                $showColors={showColors}
                onClick={handleButtonClick}
            >
                <Color color={colors[active]} />
                <img src={arrow} />
            </SelectButton>
            <ColorsBox $showColors={showColors}> 
                {colors.map((color: string, idx) => 
                    <Color 
                        ref={colorRef} key={idx} 
                        $active={idx === active ? true : false} 
                        color={color}
                        onClick={() => handleSetColor(color, idx)}
                    />)
                }
            </ColorsBox>
        </SelectColorsContainer>
    );
}