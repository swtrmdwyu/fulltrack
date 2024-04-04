import { LoadingSVG } from "./style";

export default function Loading() {
    return(
        <LoadingSVG width="66" height="66">
            <g transform="translate(33,33)">
                <circle r="32" fill="none" strokeDasharray="201.111111 201.111111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></circle>
            </g>
        </LoadingSVG>
    );
}