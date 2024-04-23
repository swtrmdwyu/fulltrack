import { renderToString } from "react-dom/server";
import { Container } from "./style";

interface LandmarlBubbleContentProps {
    description: string,
    client: string
}

export default function FenceBubbleContent({ client, description }: LandmarlBubbleContentProps) {
    return (
        <Container>
            <h2>{description}</h2>
            <address>{client}</address>
        </Container>
    )
}

export function stringFenceBubbleContent(client: string, description: string): string {
    const stringComponent = renderToString(
        <FenceBubbleContent
            description={description}
            client={client}
        />
    );
    
    return stringComponent;
}