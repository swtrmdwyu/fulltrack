import styled from "styled-components";

export const BubbleContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`;

export const StyledButton = styled.button`
    border: none;
    border-top: 1px solid var(--gray-color-lighter);
    background-color: transparent;
    display: flex;
    cursor: pointer;
    font-family: var(--primary-font);
    font-size: .813rem;
    font-weight: 500;
    justify-content: center;
    outline: none;
    padding: .875rem 0;
    width: 100%;
`;