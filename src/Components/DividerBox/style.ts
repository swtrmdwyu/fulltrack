import styled from "styled-components";

export const BoxContainer = styled.div`
    border-bottom: 1px solid var(--gray-color-light);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    overflow: hidden;
    width: calc(100% - 2rem);
    white-space: nowrap;
`;