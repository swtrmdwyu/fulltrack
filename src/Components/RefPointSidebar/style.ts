import styled from "styled-components";

export const RefSidebarContainer = styled.div`
    min-height: calc(100vh - 3.563rem);
    position: relative;
    width: 406px;
`;

export const RefContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    position: relative;
`
export const RefButtonsContainer = styled.div`
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
    width: 100%;
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