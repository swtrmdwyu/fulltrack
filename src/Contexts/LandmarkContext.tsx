import { createContext, useState } from "react";
import Client from "../interfaces/Client";
import LandmarkData from "../interfaces/LandmarkData";
import landmarkIcon from "../Map/MapMarkers/landmarkIcon";
import getAddress, { AddressRequestParams } from "../services/getAddress";
import { stringLandmarkBubbleContent } from "../Components/LandmarkBubbleContent";
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
    /**
     * Verfica se o ponto de referência deve ser salvo.
     */
    canSaveLandmark: boolean,
    /**
     * Troca o estado de "canSaveLandmark" para true ou false.
     */
    setCurrentCanSaveLandmark: (can: boolean) => void,
    landmarkAddress: string,
    changeLandmarkAddress: (landmark: H.map.Marker) => void,
    addLandmarkBubble: (landmark: H.map.Marker, ui: H.ui.UI) => H.ui.InfoBubble,
    /**
     * Reseta as informações do contexto para o padrão.
     */
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
    const [landmarkAddress, setLandmarkAddress] = useState("");
    const [canSaveLandmark, setCanSaveLandmark] = useState(false);
    
    const setCurrentColor = (color: string) => {
        setlandmarkColor(color);
    }

    const changeLandmarkColor = (landmark: H.map.Marker) => {
        landmark.setIcon(landmarkIcon(landmarkColor));

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
        setCanSaveLandmark(can);
    }

    const resetLandmark = () => {
        setCurrentColor("#85919E");
        setCurrentlandmarkClient(defaultClient);
        setCurrentLandmarkDescription("");
        setLandmarkAddress("");
        setCanSaveLandmark(false);
    }

    const changeLandmarkAddress = async (landmark: H.map.Marker) => {
        const {lat, lng} = landmark.getGeometry() as  H.geo.Point;

        const addressParams: AddressRequestParams = {              
            "code": 1234,
            "latitude": lat.toString(),
            "longitude": lng.toString(),
        }
        
        const address = await getAddress([addressParams]);
        setLandmarkAddress(address[0].description);
    }

    const addLandmarkBubble = (landmark: H.map.Marker, ui: H.ui.UI): H.ui.InfoBubble => {
        console.log(landmark)
        const position = landmark.getGeometry() as H.geo.Point;
        const { description, address } = landmark.getData();
        const content  = stringLandmarkBubbleContent(description, address);

        const bubble = new H.ui.InfoBubble(position, {
            content: content
        });

        ui.addBubble(bubble);

        return bubble;
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
            landmarkAddress,
            changeLandmarkAddress,
            addLandmarkBubble,
            resetLandmark
        }}>
            {children}
        </LandmarkContext.Provider>
    );
}

export {LandmarkProvider, LandmarkContext};