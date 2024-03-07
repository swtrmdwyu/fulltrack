import styled from "styled-components";
import { TagProps } from "./Index";

const themes = {
    "ignition-moving": {
        backgrounColor: "var(--blue-color-dark)",
        color: "var(--quartiary-color)",
    },
    "ignition-stopped": {
        backgrounColor: "var(--green-color-dark)",
        color: "var(--quartiary-color)",
    },
    "ignition-off": {
        backgrounColor: "var(--gray-color-darker)",
        color: "var(--quartiary-color)", 
    },
    "speed-moving": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--primary-color)", 
    },
    "speed-stopped": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--gray-color-dark)", 
    },
    "badge-fance-on": {
        backgrounColor: "var(--orange-color-dark)",
        color: "var(--quartiary-color)", 
    },
    "badge-no-signal": {
        backgrounColor: "var(--orange-color-dark)",
        color: "var(--quartiary-color)",
    },
    "badge-block": {
        backgrounColor: "var(--red-color-darker)",
        color: "var(--quartiary-color)",
    },
    "sensor-cool": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--primary-color)", 
    },
    "battery-good": {
        backgrounColor: "var(--gray-color-lighter)",
        color: "var(--primary-color)", 
    },
    "battery-attention": {
        backgrounColor: "var(--orange-color-lighter)",
        color: "var(--orange-color-dark)",
    },
    "battery-danger": {
        backgrounColor: "var(--red-color-ligther)",
        color: "var(--red-color-darker)", 
    },
    "driver": {
        backgrounColor: "var(--primary-color)",
        color: "var(--quartiary-color)",
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

    svg {
        path {
            stroke: ${(props: TagProps) => 
                props.type ? themes[props.type].color :
                ""
            };
        }
    }
`;