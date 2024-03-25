import Tag from "../Tag/Index";
import { CardContainer, Client, DateContainer, Header, Tags } from "./style";
import signal from "../../assets/icons/signal.svg";
import formatDate from "../../utils/formatDate";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";

export interface VehicleCardProps {
    /**
     * Recebe um objeto que representa um veiculo e suas informções.
     */
    vehicle: FormatedVehicle,
    $isBubble?: boolean
}

export default function VehicleCard({ vehicle, $isBubble}: VehicleCardProps) {
    const ignitionTagType = 
        vehicle.ignition === 0 ? 
            "ignition-off" : vehicle.speed.val === 0 ? 
                "ignition-stopped" : "ignition-moving";
    const textTagIgnition = ignitionTagType === "ignition-off" ? "Desligado" : ignitionTagType === "ignition-stopped" ? "Parado e ligado" : "Em movimento";

    const speedTagtype = vehicle.speed.val === 0 ? "speed-stopped" : "speed-moving";

    return(
        <CardContainer>
            <Header>
                <div>
                    <h2>{vehicle.ativo.ativo_name}</h2>
                    <h3>{vehicle.ativo.plate}</h3>
                </div>

                <DateContainer>
                    <img src={signal} />
                    <span>{vehicle && formatDate(vehicle.dt_gps)}</span>
                </DateContainer> 
            </Header>

            <address>{vehicle && vehicle.address}</address>

            <Tags>
                <Tag text={$isBubble ? textTagIgnition : ""} type={ignitionTagType}/>
                {
                    <Tag 
                        text={`${vehicle.speed.val} ${vehicle.speed.unit_measurement}`} 
                        type={speedTagtype}
                    /> 
                }
                {
                    vehicle.is_bloqued === 1 &&
                    <Tag 
                        type="badge-block"
                    /> 
                }
            </Tags>

            <Client>{vehicle.client}</Client>
        </CardContainer>
    );
}