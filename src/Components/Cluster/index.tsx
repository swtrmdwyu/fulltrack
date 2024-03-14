import { ClusterContainer } from "./style";

export interface ClusterProps {
    /**
     * Valor de quantos markers estão agrupados no cluster
     */
    $quantity?: number,
}

export function Cluster({ $quantity }: ClusterProps) {
    return (
        <ClusterContainer $quantity={$quantity}>
            {$quantity}
        </ClusterContainer>
    )
}