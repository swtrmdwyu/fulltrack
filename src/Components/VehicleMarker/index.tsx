import MarkerTypeName from "../../types/MarkerTypeName";
import { MarkerContainer, MarkerPoint, MarkerVehicle} from "./style";


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
    },

    
}

export default function VehicleMarker({ image, type }: VehicleMarkerProps) {

    return (
        <MarkerContainer>
            <MarkerVehicle
                image={image}
                type={type}
            />
            <MarkerPoint type={type} />
        </MarkerContainer>
    );
}