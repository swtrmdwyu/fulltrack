import styled from "styled-components";


export const SelectContainer = styled.div`
    position: relative;
`;

export const InputContainer = styled.div`
    display: flex;
    color: var(--primary-color);
    flex-direction: column;
    font-family: var(--primary-font);
    font-weight: 500;
    gap: .5rem;
    justify-content: center;
    width: 100%;
    position: relative;

    input {
        border: 1px solid var(--gray-color-medium);
        border-radius: .25rem;
        color: var(--primary-color);
        font-size: 1rem;
        line-height: 1.5rem;
        padding: .5rem 1rem;
        outline: none;
        transition: box-shadow .2s ease-in-out;
        width: calc(100% - 2rem );

        &::placeholder {
            color: var(--gray-color-medium);
        }

        &:focus {
            box-shadow: 0 0 0 0.063rem var(--gray-color-darker);
        }
    }

    label {
        font-size: .875rem;
        font-weight: 600;
    }
`;

interface SelectListProps {
    $showList: boolean
}

export const StyledButton = styled.button<SelectListProps>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: .3rem;
    position: absolute;
    right: .7rem;
    top: 2rem;

    img {
        transition: rotate .18s ease-in-out;
        rotate: ${(props: SelectListProps) => props.$showList ? "-180deg": "0deg"};
    } 
`;


export const SelectListContainer = styled.div`
    background-color: var(--quartiary-color);
    border-radius: .25rem;
    box-shadow: 0px 2px 4px 0px #6B757C52;
    margin-top:.25rem;
    max-height: 11.25rem;
    position: absolute;
    overflow: auto;
    width: 100%;
    white-space: nowrap;
    z-index: 2;

    ul {
        li {
            display: flex;
            height: 1.25rem;
            line-height: 1.313rem;
            font-family: var(--primary-font);
            font-weight: 500;
            color: var(--primary-color);
            font-size: 14px;
            padding: .5rem 1rem;

            &:hover {
                background-color: var(--gray-color-lighter);
            }
        }
    }
`;