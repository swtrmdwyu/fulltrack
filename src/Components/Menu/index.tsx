
import LinkButton from "../LinkButton";
import { LinksContainer, LogoContainer, MenuContainer } from "./style";
import fulltimeLogo from "../../assets/img/logo.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import { useState } from "react";
import MenuLink from "../../interfaces/MenuLink";

export interface MenuProps {
    menuLinks?: MenuLink[],
}

export default function Menu({ menuLinks }: MenuProps) {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(0); 
    const [changeDisplay, setChangeDisplay] = useState(false);

    /**
     * Função que é chamada quando o cursor do mouse entra na área do menu.
     * Define o estado 'expanded' como verdadeiro, indicando que o menu está expandido.
     */
    const handleMouseEnter = () => {
        setTimeout(() => {
            setExpanded(true);
            
        }, 100);

        setTimeout(() => {
            setChangeDisplay(true);
        }, 150);
        
    } 
    
    /**
     * Função que é chamada quando o cursor do mouse sai da área do menu.
     * Define o estado 'expanded' como falso, indicando que o menu não está mais expandido.
     */
    const handleMouseLeave = () => {
        setTimeout(() => {
            setExpanded(false);
        }, 100);

        setTimeout(() => {
            setChangeDisplay(false);
        }, 25);
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
            <LinksContainer $changeDisplay={changeDisplay}>
                {menuLinks && menuLinks.map((menuLink: MenuLink, idx: number)=> (
                    <li key={idx}>
                        <LinkButton
                            $active={idx === selected}
                            icon={menuLink.icon}
                            text={expanded ? menuLink.label : ""}
                            href={'#'}
                            onClick={() => handleLinkClick(idx)}
                        />
                    </li> 
                ))}
            </LinksContainer>
            
        </MenuContainer>
    );
}