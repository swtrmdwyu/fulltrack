import styled from "styled-components";
import { ButtonProps } from ".";

const themes = {
    primary: {
        backgroundColor: "var(--primary-color-medium)",
        color: "var(--quartiary-color)",
    },
    secondary: {
        backgroundColor: "var(--gray-color-lighter)",
        color: "var(--gray-color-darker)",
    },
    tertiary: {
        backgroundColor: "transparent",
        color: "var(--gray-color-darker)",
    }
}

export const StyledButton = styled.button<ButtonProps>`
    align-items: center;
    background-color: ${(props: ButtonProps) => 
        props.theme ? 
        themes[props.theme].backgroundColor : 
        ""
    };
    border: none;
    border-radius: .25rem;
    color: ${(props: ButtonProps) => 
        props.theme ? 
        themes[props.theme].color : 
        ""
    };
    cursor: pointer;
    font-family: var(--primary-font);
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    line-height: 1.5rem;
    padding: .5rem 0;
    width: 100%;
    transition: scale .3s ease-in-out;
    transition: opacity .1s ease-in-out;

    &:hover {
        opacity: .9;
    }

    &:active {
        transform: scale(0.99);
    }
`;