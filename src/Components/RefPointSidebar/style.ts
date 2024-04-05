import styled from "styled-components";

export const RefSidebarContainer = styled.div`
    min-height: calc(100vh - 3.563rem);
    position: relative;
    width: 406px;
`;

export const RefContainer = styled.div`
    padding: 1.5rem;
    position: relative;
`
export const RefButtonsContainer = styled.div`
    background-color: transparent;
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    height: 2.5rem;
    padding: 1rem;
    position: absolute;
    width: calc(100% - 2rem);
`;

export const CloseButton = styled.button`
    align-items: center;
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    padding: 0;

    &:hover {
        cursor: pointer;
    }
`

export const BarContainer = styled.div`
    align-items: center;
    cursor: default;
    display: flex;
    font-family: var(--primary-font);
    font-size: 1rem;
    font-weight: 500;
    gap: .75rem;
`;