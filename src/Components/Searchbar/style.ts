import styled from "styled-components";

export const SearchbarContainer = styled.div`
    
    position: relative;

    input {
        background-color: var(--gray-color-lighter);
        border: none;
        border-radius: .25rem;
        outline: none;
        padding: 0 1rem 0 3rem;
        height: 2.5rem;
        width: 100%;

        &::-webkit-search-cancel-button {
            -webkit-appearance: none;
        }

        &::placeholder {
            color: var(--gray-color-darker);
            font-weight: 500;
            font-size: .875rem;
        }
    }

    img{
        left: 1rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
`;