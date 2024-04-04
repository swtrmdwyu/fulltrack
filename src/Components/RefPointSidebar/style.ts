import styled from "styled-components";

export const RefSidebarContainer = styled.div`
    min-height: calc(100vh - 3.563rem);
    width: 406px;
    position: relative;
`;

export const RefContainer = styled.div`
    padding: 1.5rem;
    position: relative;
`
export const RefButtonsContainer = styled.div`
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    height: 2.5rem;
    position: absolute;
    padding: 1rem;
    width: calc(100% - 2rem);
    background-color: transparent;
`;

export const CloseButton = styled.button`
    border: none;
    background: transparent;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
    }
`

export const BarContainer = styled.div`
    font-family: var(--primary-font);
    font-size: 1rem;
    font-weight: 500;
    align-items: center;
    display: flex;
    gap: .75rem;
    cursor: default;
`;