import { renderToString } from "react-dom/server";
import { FormatedVehicle } from "../../interfaces/FormatedVehicle";
import BubbleContent from "../../Components/BubbleContent";

export function convert() {
    return (
        <></>
    );
}

//converte component react em string.
export default function stringBubbleContent(vehicle: FormatedVehicle): string {
    const convertedComponent = renderToString(
        <BubbleContent vehicle={vehicle}/>
    );

    return convertedComponent;
} 