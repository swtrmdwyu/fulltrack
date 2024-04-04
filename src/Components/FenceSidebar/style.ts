import styled from "styled-components";

export const FenceSidebarContainer = styled.div`
    min-height: calc(100vh - 3.563rem);
    width: 406px;
    position: relative;
`;

export const FenceContainer = styled.div`
    padding: 1.5rem;
    position: relative;
`
export const FenceButtonsContainer = styled.div`
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    height: 2.5rem;
    position: absolute;
    padding: 1rem;
    width: calc(100% - 2rem);
    background-color: var(--quartiary-color);
`;