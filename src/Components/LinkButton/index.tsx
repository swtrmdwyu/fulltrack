
import MenuIcons from "../Menu/MenuIcons";
import { StyledLink } from "./style";

export interface LinkButtonProps {
    /**
     * Define se o link está ativo ou não.
     */
    $active?: boolean,
    /**
     * O endereço URL para o qual o link deve apontar.
     */
    href?: string,
    /**
     * O endereço URL para o qual o link deve apontar.
     */
    icon?: string,
    /**
     * Função disparada quando o link é clicado.
     */
    onClick?: (arg1: number) => void,
    /**
     * O texto a ser exibido.
     */
    text?: string,
    
}

export default function LinkButton({ 
    $active = false, 
    href = "#", 
    icon,
    text,
    onClick
}: LinkButtonProps) {
    return (
        <StyledLink
            href={href}
            $active={$active}
            onClick={onClick}
        > 
            <MenuIcons
                size="1.5rem"
                name={icon?? ""}
            />
            {text}
        </StyledLink>
    );
}