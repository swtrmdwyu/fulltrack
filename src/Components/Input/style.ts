import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    color: var(--primary-color);
    flex-direction: column;
    font-family: var(--primary-font);
    font-weight: 500;
    gap: .5rem;
    justify-content: center;
    width: 100%;

    input {
        border: 1px solid var(--gray-color-medium);
        border-radius: .25rem;
        font-size: 1rem;
        outline: none;
        line-height: 1.5rem;
        padding: .5rem 1rem;
        width: calc(100% - 2rem );
        transition: box-shadow .2s ease-in-out;

        &::placeholder {
            color: var(--gray-color-medium);
        }

        &:focus {
            box-shadow: 0 0 0 0.063rem var(--gray-color-darker);
        }
    }

    label {
        font-size: .875rem;
    }

`;