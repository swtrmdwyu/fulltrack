import { BoxContainer } from "./style";

export interface DividerBoxProps {
    /**
     * Recebe elementos filhos.
     */
    children?: React.ReactNode,
}

export default function DividerBox({ children }: DividerBoxProps) {
    return (
        <BoxContainer>
            {children}
        </BoxContainer>
    )
}