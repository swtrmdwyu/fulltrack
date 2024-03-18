import target from "../../assets/icons/Target.svg";
import { MapControlButton } from "./style";

export default function MapControl() {
    return (
        <MapControlButton>
            <img src={target} alt="" />
        </MapControlButton>
    );
}