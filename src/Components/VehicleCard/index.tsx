import Vehicle from "../../interfaces/IVehicle";
import Tag from "../Tag/Index";
import { CardContainer, Header, Locale, Tags } from "./style";
import signal from "../../assets/icons/signal.svg";
import formatDate from "../../utils/formatDate";

export interface VehicleCardProps {
    /**
     * Recebe um objeto que representa um veiculo e suas informções.
     */
    vehicle?: Vehicle,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export default function VehicleCard({ onClick, vehicle }: VehicleCardProps) {
    const ignitionType = 
        vehicle?.ignition === 0 ? 
            "ignition-off" : vehicle?.speed.val === 0 ? 
                "ignition-stopped" : "ignition-moving";

    return(
        <CardContainer
            onClick={onClick}
        >
            <Header>
                <div>
                    <h2>{vehicle?.ativo.ativo_name}</h2>
                    <h3>{vehicle?.ativo.plate}</h3>
                </div>

                <span><img src={signal} />{vehicle && formatDate(vehicle.dt_gps)}</span> 
            </Header>

            <address>Praça Itália, 3-9 - Centro, Bauru, São Paulo, ...</address>

            <Tags>
                <Tag type={ignitionType}/>
                {/* renderiza a tag de velocidade */}
                {vehicle && (
                    vehicle.speed.val === 0 ? 
                        <Tag 
                            text={`${vehicle.speed.val} ${vehicle.speed.unit_measurement}`} 
                            type="speed-stopped"
                        /> : 
                        <Tag 
                            text={`${vehicle.speed.val} ${vehicle.speed.unit_measurement}`} 
                            type="speed-moving"
                        />
                )}
            </Tags>

            <Locale>Walmart</Locale>
        </CardContainer>
    );
}