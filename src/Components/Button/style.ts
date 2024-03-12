import styled from "styled-components";
import { ButtonProps } from ".";

const themes = {
    primary: {
        backgroundColor: "var(--primary-color-medium)",
        color: "var(--quartiary-color)",
        hoverColor: "",
    },
    secondary: {
        backgroundColor: "var(--gray-color-lighter)",
        color: "var(--gray-color-darker)",
        hoverColor: "",
    },
    tertiary: {
        backgroundColor: "transparent",
        color: "var(--gray-color-darker)",
        hoverColor: "transparent",
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

    &:hover {
        background-color: ${(props: ButtonProps) => 
            props.theme ? 
            themes[props.theme].hoverColor : 
            ""
        };
    }

    &:active {
        transform: scale(0.99);
    }
`;