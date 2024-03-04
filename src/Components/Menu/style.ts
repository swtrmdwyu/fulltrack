import styled from "styled-components";

export const MenuContainer = styled.aside`
    background-color: var(--primary-color);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: calc(100vh - 1rem);
    padding: .5rem;
    width: calc(3.5rem - 1rem);
    transition: width .2s ease-in-out;

    &:hover {
        width: 18.75rem;
    }
`;

export const LogoContainer = styled.div`
    align-items: center;
    display: flex;
    gap: .5rem;

    h1 {
        color: var(--quartiary-color);
        font-family: var(--primary-font);
        font-size: 0.938rem;
        font-weight: 600;
    }

    button {
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0;
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`;