import styled from "styled-components";

interface SidebarContentProps {
    $expanded: boolean,
}

export const SidebarContainer = styled.div`
    box-shadow: 0px 8px 16px 0px #6B757C52;
    max-height: calc(100vh - 3.563rem);
    min-height: calc(100vh - 3.563rem);
    position: relative;

`;

export const SidebarContent = styled.div<SidebarContentProps>`
    overflow: hidden;
    white-space: nowrap;
    width: ${(props: SidebarContentProps) => props.$expanded ? "25rem" : "0"};
    transition: width .4s ease-in-out;
`;

export const ToggleSideBarButton = styled.button<SidebarContentProps>`
    align-items: center;
    background-color: var(--quartiary-color);
    box-shadow: 5px 0px 16px 0px #6B757C52;
    border-radius: 0 .5rem .5rem 0;
    border: none;
    border-left: 0.71px solid var(--gray-color-light);
    display: flex;
    height: 3.25rem;
    justify-content: center;
    position: absolute;
    right: -1.5rem;
    top: 50%;
    width: 1.5rem;
    z-index: 1;

    img {
        transform: ${(props: SidebarContentProps) => props.$expanded ? "rotate(0deg)" : "rotate(180deg)"};
    }
`   