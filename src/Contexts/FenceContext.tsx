import { createContext, useState } from "react";
import FenceData from "../interfaces/FenceData";
import hexToRgba from "../utils/hexToRgba";

interface FenceContextType {
    /**
     * Cor da cerca.
     */
    fenceColor: string,
    /**
     * Altera a cor da cerca no seu estado e nos seus dados.
     */
    setCurrentFenceColor: (color: string) => void,
    /**
     * Altera a cor da cerca mapa.
     */
    changeFenceColor: (fence: H.map.Circle) => void,
}

const FenceContext = createContext<FenceContextType>({} as FenceContextType);

const FenceProvider =({ children }: { children: React.ReactNode}) => {
    const [fenceColor, setFenceColor] = useState("");

    const setCurrentFenceColor = (color: string) => {
        setFenceColor(color);
    }

    const changeFenceColor = (fence: H.map.Circle) => {
        console.log(fence)
        fence.setStyle({
            fillColor: hexToRgba(fenceColor, 0.5),
            strokeColor: fenceColor, 
        })
    }

    return (
        <FenceContext.Provider value={{
            fenceColor,
            setCurrentFenceColor,
            changeFenceColor
        }}>
            {children}
        </FenceContext.Provider>
    );
}

export {FenceProvider, FenceContext};