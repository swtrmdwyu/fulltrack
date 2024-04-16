import styled from "styled-components";

interface StyledInputProps {
    size: number
}

export const ListBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: var(--primary-font);
    color: var(--primary-color);
    font-weight: 600;
    gap: .5rem;

    label {
        font-size: .875rem;
    }
`;

export const Box = styled.div`
    border: 1px solid var(--gray-color-medium);
    border-radius: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    padding: .5rem;
    min-height: 4.5rem;

    span {
        align-items: center;
        display: flex;
        background-color: var(--gray-color-lighter);
        border-radius: .25rem;
        font-size: 1rem;
        gap: .25rem;
        height: 1.5rem;
        padding: .25rem  .5rem;
        text-transform: uppercase;
        transition: box-shadow .15s ease-in-out;

        &:hover {
            box-shadow: 0 0 0 0.063rem var(--gray-color-darker);
        }
        
        img {
            cursor: pointer;
        }
    }

    /* input {

        width: 6rem;
    }  */
`;

export const DropList = styled.div`

`;

export const StyledInput = styled.input<StyledInputProps>`
    background-color: transparent;
    border: none;
    color: var(--primary-color);
    font-family: var(--primary-font);
    font-size: 1rem;
    font-weight: 600;
    height: 1rem;   
    outline: none;
    width: ${(props: StyledInputProps) => `${props.size}rem`};
`;
