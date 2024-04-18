import { renderToString } from "react-dom/server";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";
import VehicleCard from "../VehicleCard";
import { BubbleContentContainer, StyledButton } from "./style";

interface BubbleContentProps {
    /**
     * Recebe um obejto do tipo FormatedVehicle
     */
    vehicle: FormatedVehicle
}

export default function BubbleContent({ vehicle }: BubbleContentProps) {
    return (
        <BubbleContentContainer>
            <VehicleCard vehicle={vehicle} $isBubble={true} />
            <StyledButton>Ver detalhes</StyledButton>
        </BubbleContentContainer>
    );
}

export function stringBubbleContent(vehicle: FormatedVehicle): string {
    const convertedComponent = renderToString(
        <BubbleContent vehicle={vehicle}/>
    );

    return convertedComponent;
}