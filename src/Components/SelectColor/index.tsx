import { Color, ColorsBox, SelectButton, SelectColorsContainer } from "./style";
import arrow from "../../assets/icons/arrow-select.svg";
import { useState } from "react";

export interface SelectColorProps {
    /**
     * Chamada quando a cor do componente for alterada.
     */
    setColor: (color: string) => void
}

export default function SelectColor({ setColor }: SelectColorProps) {
    const [showColors, setShowColors] = useState(false);
    const [active, setActive] = useState(0);

    const handleButtonClick = () => {
        setShowColors((previous) => !previous);
    }

    const handleSetColor = (color: string, idx: number) => {
        handleButtonClick();
        setActive(idx);
        if(setColor) setColor(color);
    }

    const colors = [
        "#85919E",
        "#6390F5",
        "#3A99D5",
        "#19A675",
        "#D3771E",
        "#E4704D",
        "#E95F77",
        "#C372CF",
        "#9B85D7"
    ];

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
                        key={idx} 
                        $active={idx === active ? true : false} 
                        color={color}
                        onClick={() => handleSetColor(color, idx)}
                    />)
                }
            </ColorsBox>
        </SelectColorsContainer>
    );
}