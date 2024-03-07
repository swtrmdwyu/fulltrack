import styled from "styled-components";
import { TagProps } from "./Index";
import icone from "../../assets/icons/arrow.svg"

const themes = {
    "ignition-moving": {
        backgrounColor: "var(--green-color-dark)",
        color: "var(--quartiary-color)",
        icon: icone,
    },
    "ignition-stopped": {
        backgrounColor: "var(--blue-color-dark)",
        color: "var(--quartiary-color)",
        icon: icone,
    },
    "ignition-off": {
        backgrounColor: "var(--gray-color-darker)",
        color: "var(--quartiary-color)", 
        icon: icone,
    },
    "speed-moving": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--primary-color)", 
        icon: icone,
    },
    "speed-stopped": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--gray-color-dark)", 
        icon: icone,
    },
    "badge-fance-on": {
        backgrounColor: "var(--orange-color-dark)",
        color: "var(--quartiary-color)", 
        icon: icone,
    },
    "badge-no-signal": {
        backgrounColor: "var(--orange-color-dark)",
        color: "var(--quartiary-color)",
        icon: icone,
    },
    "badge-block": {
        backgrounColor: "var(--red-color-darker)",
        color: "var(--quartiary-color)",
        icon: icone,
    },
    "sensor-cool": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--primary-color)", 
        icon: icone,
    },
    "battery-good": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--primary-color)", 
        icon: icone,
    },
    "battery-attention": {
        backgrounColor: "var(--orange-color-lighter)",
        color: "var(--orange-color-dark)",
        icon: icone,
    },
    "battery-danger": {
        backgrounColor: "var(--red-color-ligther)",
        color: "var(--red-color-darker)", 
        icon: icone,
    },
    "driver": {
        backgrounColor: "var(--primary-color)",
        color: "var(--quartiary-color)",
        icon: icone,
    }
}

export const StyledTag = styled.span<TagProps>`
    align-items: center;
    background-color: ${(props: TagProps) => 
        props.type ? themes[props.type].backgrounColor :
         ""
    };
    border-radius: .25rem;
    color: ${(props: TagProps) => 
        props.type ? themes[props.type].color :
         ""
    };
    display: inline-flex;
    flex-wrap: nowrap;
    font-family: var(--primary-font);
    font-size: .75rem;
    font-weight: 600;
    gap: .125rem;
    height: calc(1.125rem - .125rem);
    padding: .125rem .25rem;
    white-space: nowrap;
`;