import H from '@here/maps-api-for-javascript';
import { FormatedVehicle } from '../../../interfaces/FormatedVehicle';

export default function VehicleBubble(vehicle: FormatedVehicle, content: string) {
    const vehicleBubble = new H.ui.InfoBubble({
        lat: vehicle.lat_lng[0],
        lng: vehicle.lat_lng[1]
    }, {
        
        content: content
      });

    return vehicleBubble;
}