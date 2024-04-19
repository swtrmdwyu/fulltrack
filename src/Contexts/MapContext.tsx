import { createContext, useState } from "react";

interface MapContexType {
    map: H.Map | null,
    setCurrentMap: (map: H.Map) => void,
    ui: H.ui.UI | null,
    setCurrentUi: (ui: H.ui.UI) => void,
    isClustering: boolean,
    toggleIsClustering: () => void
}

const MapContext = createContext<MapContexType>({} as MapContexType);

const MapProvider = ({ children }: { children: React.ReactNode }) => {
    const [ map, setMap ] = useState<H.Map | null>(null);
    const [ ui, setUi ] = useState<H.ui.UI | null>(null);
    const [ isClustering, setIsClustering ] = useState(true);

    const setCurrentMap = (map: H.Map) => {
        setMap(map);
    }

    const setCurrentUi = (ui: H.ui.UI) => {
        setUi(ui);
    }

    const toggleIsClustering = () => {
        setIsClustering((previous) => !previous);
    }

    return (
        <MapContext.Provider value={{
            map,
            setCurrentMap,
            ui,
            setCurrentUi,
            isClustering,
            toggleIsClustering
        }}>
            {children}
        </MapContext.Provider>
    );
}

export { MapContext, MapProvider };