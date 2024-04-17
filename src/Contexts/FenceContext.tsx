import { createContext, useState } from "react";
import FenceData from "../interfaces/FenceData";
import hexToRgba from "../utils/hexToRgba";
import Client from "../interfaces/Client";

export interface FenceVehicle {
    ativo_name: string,
    ativo_id: number,
}

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
    /**
     * É a descrição da cerca.
     */
    fenceDescription: string,
    /**
     * Altera a descrição da cerca.
     */
    setCurrentFenceDescription: (description: string) => void,
    /**
     * Armazena o cliente referente a cerca.
     */
    fenceClient: Client,
    /**
     * Altera o cliente da cerca.
    */
    changeFenceClient: (client: Client) => void,
    /**
     * Armazena os veículos da cerca.
     */
    fenceVehicles: FenceVehicle[],
    /**
     * Altera os veúclos da cerca.
     */
    changeFenceVehicles: (vehicles: FenceVehicle[]) => void,
    /**
     * Restaura todos os estados para o padrão.
     */
    resetFence: () => void
}

const FenceContext = createContext<FenceContextType>({} as FenceContextType);

const FenceProvider =({ children }: { children: React.ReactNode}) => {
    const [fenceColor, setFenceColor] = useState("#85919E");
    const [fenceDescription, setFenceDescription] = useState("");
    const [fenceClient, setFenceClient] = useState<Client>({
        client_description: "",
        client_id: -1,
    });
    const [fenceVehicles, setFenceVehicles] = useState<FenceVehicle[] | []>([]);

    const setCurrentFenceColor = (color: string) => {
        setFenceColor(color);
    }

    const changeFenceColor = (fence: H.map.Circle) => {
        const fillColor = hexToRgba(fenceColor, 0.5);

        fence.setStyle({
            fillColor: fillColor,
            strokeColor: fenceColor,
        });

        const fenceData: FenceData = fence.getData();
        fenceData.colors.fillColor = fillColor;
        fenceData.colors.strokeColor = fenceColor;

        fence.setData(fenceData);
    }

    const setCurrentFenceDescription = (description: string) => {
        setFenceDescription(description);
    }

    const resetFence = () => {
        setFenceColor("#85919E");
        setFenceDescription("");
    }

    const changeFenceClient = (client: Client) => {
        setFenceClient(client);
    }

    const changeFenceVehicles = (vehicles: FenceVehicle[]) => {
        setFenceVehicles(vehicles);
    }

    return (
        <FenceContext.Provider value={{
            fenceColor,
            setCurrentFenceColor,
            changeFenceColor,
            fenceDescription,
            setCurrentFenceDescription,
            fenceClient,
            changeFenceClient,
            fenceVehicles,
            changeFenceVehicles,
            resetFence
        }}>
            {children}
        </FenceContext.Provider>
    );
}

export {FenceProvider, FenceContext};