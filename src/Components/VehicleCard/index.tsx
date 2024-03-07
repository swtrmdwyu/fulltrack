import Vehicle from "../../interfaces/Vehicle";
import Tag from "../Tag/Index";
import { CardContainer, Header, Locale, Tags } from "./style";
import signal from "../../assets/icons/signal.svg";

export interface VehicleCardProps {
    vehicles?: Vehicle[],
}

export default function VehicleCard({}: VehicleCardProps) {
    return(
        <CardContainer>
            <Header>
                <div>
                    <h2>VOLVO VM 270 6X2R</h2>
                    <h3>OYF4425</h3>
                </div>

                <span><img src={signal} />há 1 hora</span> 
            </Header>

            <address>Praça Itália, 3-9 - Centro, Bauru, São Paulo, ...</address>

            <Tags>
                <Tag text="ignition-moving" type="ignition-moving" />
                <Tag text="ignition-stopped" type="ignition-stopped" />
                <Tag text="ignition-off" type="ignition-off" />
                <Tag text="speed-moving" type="speed-moving" />
                <Tag text="speed-stopped" type="speed-stopped" />
                <Tag text="badge-fance-on" type="badge-fance-on" />
                <Tag text="badge-no-signal" type="badge-no-signal" />
                <Tag text="badge-block" type="badge-block" />
                <Tag text="sensor-cool" type="sensor-cool" />
                <Tag text="battery-good" type="battery-good" />
                <Tag text="battery-attention" type="battery-attention" />
                <Tag text="battery-danger" type="battery-danger" />
                <Tag text="driver" type="driver" />

            </Tags>

            <Locale>Walmart</Locale>
        </CardContainer>
    );
}