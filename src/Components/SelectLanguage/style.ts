import styled from "styled-components";

export const StyledSelect = styled.select`
    background-color: transparent;
    border: none;
    color: var(--gray-color-darker);
    font-family: var(--primary-font);
    font-size: 1rem;
    outline: none;

    option {
        border: none;
        outline: none;
    }
`;