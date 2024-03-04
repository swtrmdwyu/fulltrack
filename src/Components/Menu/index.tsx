import { MenuLink } from "../../types/MenuLink";
import LinkButton from "../LinkButton";
import { LinksContainer, LogoContainer, MenuContainer } from "./style";
import fulltimeLogo from "../../assets/img/logo-fulltime.png";
import arrowDown from "../../assets/icons/arrow-down.svg";
import { useState } from "react";

export interface MenuProps {
    menuLinks?: MenuLink[],
}

export default function Menu({ menuLinks }: MenuProps) {
    const [ expanded, setExpanded ] = useState(false);
    const [ selected, setSelected ] = useState(0);

    /**
     * Função que é chamada quando o cursor do mouse entra na área do menu.
     * Define o estado 'expanded' como verdadeiro, indicando que o menu está expandido.
     */
    const handleMouseEnter = () => {
        setTimeout(() => {
            setExpanded(true);
        }, 100)
    }   
    
    /**
     * Função que é chamada quando o cursor do mouse sai da área do menu.
     * Define o estado 'expanded' como falso, indicando que o menu não está mais expandido.
     */
    const handleMouseLeave = () => {
        setExpanded(false);
    }
    
    /**
     * Função que é chamada quando o link do menu é clicado e assim tornando-o ativo.
     */
    const handleLinkClick = (key: number) => {
        setSelected(key);
    }

    return (
        <MenuContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <LogoContainer>
                <img src={fulltimeLogo} alt="Logo Fulltime" />
                { expanded && 
                    <>
                        <h1>Fulltrack</h1>
                        <button><img src={arrowDown} /></button>
                    </>
                }
            </LogoContainer>
            <LinksContainer>
                {menuLinks && menuLinks.map((menuLink: MenuLink, idx: number)=> (
                    <LinkButton
                        key={idx}
                        $active={idx === selected}
                        icon={menuLink.icon}
                        text={expanded ? menuLink.label : ""}
                        href={'#'}
                        onClick={() => handleLinkClick(idx)}
                    />
                ))}
            </LinksContainer>
            
        </MenuContainer>
    );
}