import { createContext, useState } from "react";
import referenceMarker from "../Map/MapMarkers/referenceMarker";

interface LandmarkContextType {
    color: string,
    setCurrentColor: (color: string) => void,
    changeLandmarkColor: (map: H.Map, landmark: H.map.Marker) => void
}

const LandmarkContext = createContext<LandmarkContextType>({} as LandmarkContextType);

const LandmarkProvider =({ children }: { children: React.ReactNode}) => {

    const [color, setColor] = useState("");

    
    const setCurrentColor = (color: string) => {
        setColor(color);
    }

    const changeLandmarkColor = (map: H.Map, landmark: H.map.Marker) => {
        //mduar a cor
    }

    return (
        <LandmarkContext.Provider value={{color, setCurrentColor, changeLandmarkColor}}>
            {children}
        </LandmarkContext.Provider>
    );
}

export {LandmarkProvider, LandmarkContext};