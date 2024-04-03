import styled from "styled-components";

export const LoadingSVG = styled.svg`
    display: block;
        circle {
            animation: rotate 3s ease-in-out infinite;
            stroke: var(--primary-color);
        }

        @keyframes rotate {
            from {
                animation-timing-function: ease-in;
                stroke-dashoffset: 201.111111;
                transform: rotate(0);
            }
        
            33% {
                stroke-dashoffset: 0;
                transform: rotate(0.33turn);
            }
        
            67% {
                animation-timing-function: ease-out;
                stroke-dashoffset: 0;
                transform: rotate(0.67turn);
            }
        
            to {
                stroke-dashoffset: -201.111111;
                transform: rotate(1turn);
            }
        }

`;

  
