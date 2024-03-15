import { SidebarContainer, SidebarContent, ToggleSideBarButton } from "./style";
import arrow from "../../assets/icons/arrow.svg";
import { useState } from "react";

export interface SideBarProps {
    /**
     * Reecebe todos os elementos filhos da sidebar.
     */
    children?: React.ReactNode,
    onClick?: () => void,
}

export default function Sidebar({ children, onClick }: SideBarProps) {
    const [ expanded, setExpanded ] = useState(true);
 
    const toggleSideBar = () => {
        setExpanded((previous) => !previous);
        if(onClick) onClick();
    }

    return(
        <SidebarContainer>
            <SidebarContent
                $expanded={expanded}
            >
                {children}
            </SidebarContent>
            
            <ToggleSideBarButton
                $expanded={expanded}
                onClick={toggleSideBar}
            >
                <img src={arrow} />
            </ToggleSideBarButton>
        </SidebarContainer>
    );
}