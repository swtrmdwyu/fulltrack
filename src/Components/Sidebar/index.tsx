import { SidebarContainer, SidebarContent, ToggleSideBarButton } from "./style";
import arrow from "../../assets/icons/arrow.svg";
import { useState } from "react";

export interface SideBarProps {
    children?: React.ReactNode,
}

export default function Sidebar({ children }: SideBarProps) {
    const [ expanded, setExpanded ] = useState(true);
 
    const toggleSideBar = () => {
        setExpanded((previous) => !previous);
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