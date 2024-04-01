import styled from "styled-components";
import { ClusterProps } from ".";

export const ClusterContainer = styled.div<ClusterProps>`
    align-items: center;
    background-color: var(--primary-color);
    border: .5rem solid var(--secondary-color);
    border-radius: 50%;
    color: var(--quartiary-color);
    cursor: pointer;
    display: flex;
    font-family: var(--primary-font);
    font-size: .875rem;
    font-weight: 600;
    height: 2rem;
    justify-content: center;
    width: 2rem;
`;