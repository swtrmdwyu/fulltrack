import { useState } from "react";
import MarkerTypeName from "../../types/MarkerTypeName";
import { MarkerContainer, MarkerPoint, MarkerVehicle, VehicleStatus } from "./style";


export interface VehicleMarkerProps {
    /**
     * Define qual imagem será exibida dentro do marker.
     */
    image?:  string,
    /**
     * Define qual variação de tipo o marker deve ser.
     */
    type?: MarkerTypeName,
    /**
     * Revebe um objeto com informções do veículo que o marker representa.
     */
    vehicle?: {
        /**
         * Recebe a placa do veiculo.
         */
        plate?: string,
        /**
         * Recebe a velocidade do veículo.
         */
        speed?: string
    }
}

export default function VehicleMarker({ image, type }: VehicleMarkerProps) {
    const [ isVisible, setIsVisible ] = useState(false);

    const toggleStatusVisiblity = () => {
        setIsVisible((previous) => !previous);
    }

    return (
        <MarkerContainer>
            <MarkerVehicle
                image={image}
                type={type}
                onClick={toggleStatusVisiblity}
            />
            <MarkerPoint type={type} />
            <VehicleStatus 
                type={type}
                $isVisible={isVisible}
            >
                <div><h2>Em mov.</h2></div>
                <div>90 km/h</div>
                <div>BEE4R22</div>
            </VehicleStatus>
        </MarkerContainer>
    );
}