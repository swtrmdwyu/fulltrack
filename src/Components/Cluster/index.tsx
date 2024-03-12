import { ClusterContainer } from "./style";

export interface ClusterProps {
    $quantity?: number,
}

export function Cluster({ $quantity }: ClusterProps) {
    return (
        <ClusterContainer $quantity={$quantity}>
            {$quantity}
        </ClusterContainer>
    )
}