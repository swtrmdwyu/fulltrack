import styled from "styled-components";

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: var(--primary-font);

    address {
        color: var(--gray-color-dark);
        font-size: .75rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.125rem;
        margin-top: .25rem;
        max-width: 270px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const Header = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;

    div {
        align-items: center;
        display: flex;
        color: var(--primary-color);
        height: 1.313rem;
        gap: .5rem;

        h2, h3 {
            font-size: .875rem;
        }
        
        h2 {
            font-weight: 600;
        }

        h3 {
            color: var(--gray-color-dark);
            font-weight: 500;
            text-transform: uppercase;
        }
    }
`;

export const DateContainer = styled.div`
        align-items: center;
        display: flex;
        height: 1.125rem;
        gap: .5rem;
        font-size: .75rem;
        justify-content: center;
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    margin-top: .5rem;
`;

export const Client = styled.span`
    color: var(--primary-color);
    font-size: .75rem;
    line-height: 1.125;
    margin-top: .5rem;
`;