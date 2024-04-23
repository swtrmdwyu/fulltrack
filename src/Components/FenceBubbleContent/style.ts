import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: .25rem;
    width: 13rem;
    font-family: var(--primary-font);
    font-weight: 500;

    h2 {
        color: var(--primary-color);
        font-size: .938rem;
        line-height: 1.25rem;
    }

    address {
        font-style: normal;
        color: var(--gray-color-darker);
        line-height: 1.138rem;
        font-size: .813rem;
    }
`;