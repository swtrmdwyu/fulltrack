import styled from "styled-components";
import { LinkButtonProps } from ".";

const theme = {
    secondaryColor: 'var(--secondary-color)',
    tertiaryColor: 'var(--tertiary-color)',
    quartiaryColor: 'var(--quartiary-color)',
}

export const StyledLink= styled.a<LinkButtonProps>`
    align-items: center;
    display: flex;
    color: ${(props: LinkButtonProps) => 
        props.$active ? 
        theme.tertiaryColor : 
        theme.secondaryColor 
    };
    font-family: var(--primary-font);
    font-weight: 500;
    font-size: .875rem;
    gap:  1rem;
    padding: .5rem;
    text-decoration: none;
    transition: color .1s ease-in-out;

    svg {
        path {
            stroke: ${(props: LinkButtonProps) => 
                props.$active ? 
                theme.tertiaryColor : 
                theme.quartiaryColor 
            };
        }
        transition: color .1s ease-in-out;
        opacity: ${(props: LinkButtonProps) => props.$active ? "1" : ".64"};
    }

    &:hover {
        color: var(--tertiary-color);
        svg {
            opacity: 1;
            path {
                stroke: var(--tertiary-color);
            }
            
        }
    }
`;