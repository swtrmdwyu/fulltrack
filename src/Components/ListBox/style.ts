import styled from "styled-components";

interface StyledInputProps {
    size: number
}

interface DropListProps {
    $show: boolean
}

export const ListBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: var(--primary-font);
    color: var(--primary-color);
    font-weight: 500;
    gap: .5rem;
    position: relative;

    label {
        font-size: .875rem;
    }

    p {
        color: var(--gray-color-medium);
        font-weight: 400;
        margin-left: .5rem;
    }
`;

export const Box = styled.div`
    border: 1px solid var(--gray-color-medium);
    border-radius: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    padding: .5rem;
    min-height: 3.5rem;

    span {
        align-items: center;
        display: flex;
        background-color: var(--gray-color-lighter);
        border-radius: .25rem;
        font-size: .875rem;
        gap: .25rem;
        height: 1rem;
        padding: .25rem  .5rem;
        position: relative;
        transition: box-shadow .15s ease-in-out;
        
        img {
            cursor: pointer;
        }
    }
`;

export const DropList = styled.div<DropListProps>`
    border-radius: .25rem;
    box-shadow: 0px 2px 4px 0px #6B757C52;
    background-color: var(--quartiary-color);
    display: ${(props: DropListProps) => props.$show ? "block" : "none"};
    top: calc(100% + .25rem);
    position: absolute;
    max-height: 12.625rem;
    padding: .5rem 0;
    overflow-y: scroll;
    width: 100%;
    z-index: 2;

    ul{

        li {
            align-items: center;
            color: var(--primary-color);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            font-size: .875rem;
            font-weight: 500;
            line-height: 22px;
            padding: .5rem 1rem;

            &:hover {
                background-color: var(--gray-color-lighter);
            }
        }
    }

`;

export const StyledInput = styled.input<StyledInputProps>`
    background-color: transparent;
    border: none;
    color: var(--primary-color);
    font-family: var(--primary-font);
    font-size: .875rem;
    font-weight: 500;
    height: 1rem;   
    outline: none;
    width: ${(props: StyledInputProps) => `${props.size}rem`};
`;

export const Complete = styled.p`
    position: absolute;
    top: 0;

`;