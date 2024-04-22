import { renderToString } from "react-dom/server";

interface ClusterMarkerProps {
    weight: number
}

export default function ClusterMarker({ weight }: ClusterMarkerProps) {
    const style = `
        text {
            font-family: "Inter", sans-serif;
            font-size: .875rem;
            font-weight: 600;
        }
    `;

    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    {style}
                </style>
            </defs>

            <circle opacity="0.24" cx="24" cy="24" r="24" fill="#26333B"/>
            <circle cx="24" cy="24" r="15.2727" fill="#26333B"/>
            <text x="24" y="24" text-anchor="middle" dominant-baseline="central" fill="white" fontFamily="Inter">{weight}</text>
        </svg>
    );
}

export function stringCluster(weight: number): string {
    const convertedComponent = renderToString(
        
        <ClusterMarker weight={weight}/>
    )
    return convertedComponent;
}