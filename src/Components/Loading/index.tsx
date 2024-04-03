import { LoadingSVG } from "./style";

export default function Loading() {
    return(
        <LoadingSVG width="66" height="66">
            <g transform="translate(33,33)">
                <circle r="32" fill="none" stroke-dasharray="201.111111 201.111111" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></circle>
            </g>
        </LoadingSVG>
    );
}