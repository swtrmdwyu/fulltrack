import { renderToString } from "react-dom/server";
import VehicleCard from "../Components/VehicleCard";
import { FormatedVehicle } from "../interfaces/FormatedVehicle";

export function convert() {
    return (
        <></>
    );
}

//converte component react em string.
export default function stringVehicleCard(vehicle: FormatedVehicle): string {
    const convertedComponent = renderToString(
        <VehicleCard vehicle={vehicle} />
    );

    return convertedComponent;
} 