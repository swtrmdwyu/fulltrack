import styled from "styled-components";
import check from "../../assets/icons/check.svg";

interface SelectButtonProps {
    $showColors: boolean
}

interface ColorProps {
    color: string
    $active?: boolean
}

export const SelectColorsContainer = styled.div`
    position: relative;
    width: 4.125rem;
`;

export const SelectButton = styled.button<SelectButtonProps>`
    align-items: center;
    background-color: var(--gray-color-lighter);
    border: none;
    border-radius: .25rem;
    display: flex;
    gap: .5rem;
    padding: .5rem;
    width: 4.125rem;

    img {
        transition: rotate .18s ease-in-out;
        rotate: ${(props: SelectButtonProps) => props.$showColors ? "-180deg" : "0deg"};
    }
`;

export const Color = styled.div<ColorProps>`
    background-color: ${(props: ColorProps) => props.color ? props.color : "var(--landmark-color-gray)"};
    border-radius: .25rem;
    cursor: pointer;
    height: 2rem;
    width: 2rem;
    background-image: ${(props: ColorProps) => props.$active ? `url(${check})` : "none"};
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
        opacity: .9;
        /* background-image: url(${check}); */
    }
`;

export const ColorsBox = styled.div<SelectButtonProps>`
    background-color: var(--quartiary-color);
    border-radius: .25rem;
    box-shadow: 0px 2px 4px 0px #6B757C52;
    display: ${(props: SelectButtonProps) => props.$showColors ? "flex" : "none"};
    flex-wrap: wrap;
    gap: .5rem;
    padding: 1rem;
    position: absolute;
    top: 3.5rem;
    width: 7rem;
    z-index: 2;
`