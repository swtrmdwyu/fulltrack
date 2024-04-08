import { renderToString } from "react-dom/server";
import VehicleMarker from "../../Components/VehicleMarker";
import MarkerTypeName from "../../types/MarkerTypeName";

export function convert() {
    return (
        <></>
    );
}

//converte component react em string.
export default function stringVehicleMarker(type: MarkerTypeName): string {
    const convertedComponent = renderToString(<VehicleMarker type={type} />)
    return convertedComponent;
} 