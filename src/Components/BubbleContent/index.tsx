import { FormatedVehicle } from "../../interfaces/FormatedVehicle";
import VehicleCard from "../VehicleCard";
import { BubbleContentContainer, StyledButton } from "./style";

interface BubbleContentProps {
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