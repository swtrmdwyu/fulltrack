import api from "../api/api";
import Vehicle from "../interfaces/Vehicle";

export default async function getVehicles(token: string){
    const vehicles: Vehicle[] = [];

    await api
    .get("maps/v2/last-positions/?ignitions=on,off,moving", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        vehicles.push([...response.data as Vehicle] as Vehicle[])
    })
    .catch((error) => console.log(error));

    return vehicles;
}