import Vehicle from "../../interfaces/Vehicle";
import Tag from "../Tag/Index";
import { CardContainer, Header, Locale, Tags } from "./style";
import signal from "../../assets/icons/signal.svg";

export interface VehicleCardProps {
    vehicle?: Vehicle,
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return(
        <CardContainer>
            <Header>
                <div>
                    <h2>{vehicle?.ativo.ativo_name}</h2>
                    <h3>{vehicle?.ativo.plate}</h3>
                </div>

                <span><img src={signal} />há 1 hora</span> 
            </Header>

            <address>Praça Itália, 3-9 - Centro, Bauru, São Paulo, ...</address>

            <Tags>
                {/* {vehicle && (
                    vehicle.ignition === 0 ? 
                    <Tag type="ignition-off"/> : 
                        vehicle.speed.val === 0 ? 
                            <Tag type="ignition-stopped"/> : 
                            <Tag type="ignition-moving"/>
                )} */}

                {/* renderiza a tag de status da realcionado a ignição */}
                {vehicle && (() => {
                    if(vehicle.ignition === 0) {
                        return <Tag type="ignition-off"/>
                    }

                    if(vehicle.speed.val === 0) {
                        return <Tag type="ignition-stopped"/>
                    }

                    return <Tag type="ignition-moving"/>
                })()}

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