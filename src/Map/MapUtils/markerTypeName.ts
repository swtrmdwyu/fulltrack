import Vehicle from "../../interfaces/Vehicle";
import MarkerTypeName from "../../types/MarkerTypeName";

export default function markerType(vehicle: Vehicle): MarkerTypeName {
	if(vehicle.is_bloqued) {
		return "block";
	}

	if(vehicle.ignition === 0) {
		return "ignition-off"
	}

	if(vehicle.speed.val === 0) {
		return "ignition-on"
	}

	if(vehicle.speed.val > 0) {
		return "moving"
	}

	if(vehicle.dt_gps === "") {
		return "no-signal"
	}

	return undefined;
}