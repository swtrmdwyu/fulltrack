import styled from "styled-components";
import { VehicleMarkerProps } from ".";
import truckContainer from "../../assets/icons/truck-container.svg";

interface VehicleStatusProps extends VehicleMarkerProps {
    $isVisible: boolean
}

const themes = {
    "moving": {
        titleColors: {
            color: "var(--blue-color-dark)",
            background: "var(--blue-color-lighter)"
        },
        background: "var(--blue-color-darker)",
        borderColor: "var(--blue-color-medium)"
    },
    "ignition-on": {
        titleColors: {
            color: "var(--green-color-dark)",
            background: "var(--green-color-lighter)"
        },
        background: "var(--green-color-darker)",
        borderColor: "var(--green-color-medium)"
    },
    "ignition-off": {
        titleColors: {
            color: "var(--gray-color-dark)",
            background: "var(--gray-color-lighter)"
        },
        background: "var(--gray-color-darker)",
        borderColor: "var(--gray-color-darker)"
    },
    "block": {
        titleColors: {
            color: "var(--red-color-dark)",
            background: "var(--red-color-lighter)"
        },
        background: "var(--red-color-darker)",
        borderColor: "var(--red-color-darker)"
    },
    "no-signal": {
        titleColors: {
            color: "var(--orange-color-dark)",
            background: "var(--orange-color-lighter)"
        },
        background: "var(--orange-color-darker)",
        borderColor: "var(--orange-color-medium)"
    }
};

export const MarkerContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 3.25rem;
    justify-content: space-between;
    position: relative;
    width: 2.5rem;
    left: -1.2rem;
    top: -3.03rem;
`;

export const MarkerVehicle = styled.div<VehicleMarkerProps>`
    background-color: ${(props: VehicleMarkerProps) => props.type ? themes[props.type].background : ""};
    background-image: ${(props: VehicleMarkerProps) => props.image ? `url(${props.image})` : `url(${truckContainer})`};
    background-size: ${(props: VehicleMarkerProps) => props.image ? "cover" : ""};
    background-repeat: no-repeat;
    background-position: center;
    border: .25rem solid ${(props: VehicleMarkerProps) => props.type ? themes[props.type].borderColor : ""};
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
`;

export const MarkerPoint = styled.div<VehicleMarkerProps>`
    
    background-color: ${(props: VehicleMarkerProps) => 
        props.type === "moving" || props.type === "ignition-on" ?
        "var(--blue-color-dark)" : 
        "var(--gray-color-darker)"
    };
    border-radius: 50%;
    height: .5rem;
    width: .5rem;

`;
