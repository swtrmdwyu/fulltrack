import { renderToString } from "react-dom/server";
import { Container } from "./style";

interface LandmarlBubbleContentProps {
    description: string,
    address: string
}

export default function LandmarkBubbleContent({ address, description }: LandmarlBubbleContentProps) {
    return (
        <Container>
            <h2>{address}</h2>
            <address>{description}</address>
        </Container>
    )
}

export function stringLandmarkBubbleContent(description: string, address: string): string {
    const stringComponent = renderToString(
        <LandmarkBubbleContent
            address={address}
            description={description}
        />
    );
    
    return stringComponent;
}