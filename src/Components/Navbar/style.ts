import styled from "styled-components";

export const StyledNav = styled.nav`
    align-items: center;
    border-bottom: 1px solid var(--gray-color-light);
    display: flex;
    gap: 1.5rem;
    height: calc(3.5rem - 1rem);
    justify-content: flex-end;
    padding: .5rem 1.5rem;

    div {
        display: flex;
        gap: 0.75rem;
    }
`;

