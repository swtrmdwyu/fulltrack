import { createContext, useRef, useState } from "react";
import referenceMarker from "../Map/MapMarkers/referenceMarker";
import Client from "../interfaces/Client";
import LandmarkData from "../interfaces/LandmarkData";

interface LandmarkContextType {
    /**
     * Armazena a cor do ponto de referência.
     */
    landmarkColor: string,
    /**
     * Altera a cor no estado de cor.
     */
    setCurrentColor: (color: string) => void,
    /**
     * Muda a cor do marker no mapa e nos seus dados.
     */
    changeLandmarkColor: (landmark: H.map.Marker) => void,
    /**
     * Armazena o cliente do ponto de referência.
     */
    landmarkClient: Client,
    /**
     * Altera o cliente no estado de client.
     */
    setCurrentlandmarkClient: (Client: Client) => void,
    /**
     * Muda o cliente do marker nos seus dados.
     */
    changeLandmarkClient: (landmark: H.map.Marker) => void,
    /**
     * Armazena a descrição do ponto de referência.
     */
    landmarkDescription: string,
    /**
     * Altera a descrição no estado de descrição.
     */
    setCurrentLandmarkDescription: (description: string) => void,
    /**
     * Muda a descrição do marker nos seus dados.
     */
    changeLandmarkDescription: (landmark: H.map.Marker) => void,
    canSaveLandmark: boolean,
    setCurrentCanSaveLandmark: (can: boolean) => void,
    resetLandmark: () => void
}

const LandmarkContext = createContext<LandmarkContextType>({} as LandmarkContextType);

const LandmarkProvider =({ children }: { children: React.ReactNode}) => {
    const defaultClient: Client = {
        client_description: "",
        client_id: -1
    }

    const [landmarkColor, setlandmarkColor] = useState("#85919E");
    const [landmarkClient, setLandmarkClient] = useState<Client>(defaultClient);
    const [landmarkDescription, setLandmarkDescription] = useState("");
    const [canSaveLandmark, setCanSaveLandmark] = useState(false);
    
    const setCurrentColor = (color: string) => {
        setlandmarkColor(color);
    }

    const changeLandmarkColor = (landmark: H.map.Marker) => {
        landmark.setIcon(referenceMarker(landmarkColor));

        const landmarkData: LandmarkData = landmark.getData();
        landmarkData.color = landmarkColor;
        
        landmark.setData(landmarkData);
    }

    const setCurrentlandmarkClient = (client: Client) => {
        setLandmarkClient(client);
    }

    const changeLandmarkClient = (landmark: H.map.Marker) => {
        const landmarkData: LandmarkData = landmark.getData();
        landmarkData.client = landmarkClient;

        landmark.setData(landmarkData);
    }

    const setCurrentLandmarkDescription = (description: string) => {
        setLandmarkDescription(description);
    }

    const changeLandmarkDescription = (landmark: H.map.Marker) => {
        const landmarkData: LandmarkData = landmark.getData();
        landmarkData.description = landmarkDescription;

        landmark.setData(landmarkData);
    }

    const setCurrentCanSaveLandmark = (can: boolean) => {
        setCanSaveLandmark((previous) => !previous);
    }

    const resetLandmark = () => {
        setCurrentColor("#85919E");
        setCurrentlandmarkClient(defaultClient);
        setCurrentLandmarkDescription("");
    }

    return (
        <LandmarkContext.Provider value={{
            landmarkColor, 
            setCurrentColor, 
            changeLandmarkColor,
            landmarkClient,
            setCurrentlandmarkClient,
            changeLandmarkClient,
            landmarkDescription,
            setCurrentLandmarkDescription,
            changeLandmarkDescription,
            canSaveLandmark,
            setCurrentCanSaveLandmark,
            resetLandmark
        }}>
            {children}
        </LandmarkContext.Provider>
    );
}

export {LandmarkProvider, LandmarkContext};