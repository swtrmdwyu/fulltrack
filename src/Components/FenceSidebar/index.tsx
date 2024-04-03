import { FenceSidebarContainer } from "./style";

interface FenceSidebarProps {
    children: React.ReactNode
}
export default function FenceSidebar({ children } : FenceSidebarProps) {
    return(
        <FenceSidebarContainer>
            {children}
        </FenceSidebarContainer>
    );
}