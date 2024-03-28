// import api from "../api/api";
// import Vehicle from "../interfaces/Vehicle";

// export default async function getVehicles(token: string): Promise<Vehicle[]>{
//     const vehicles: Vehicle[] = [];

//     await api
//     .get("maps/v2/last-positions/?ignitions=on,off,moving", {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then((response) => {
//         const vehiclesList: Vehicle[] = response.data.map((vehicle: Vehicle) => vehicle);
//         vehicles.push(...vehiclesList);
//     })
//     .catch((error) => console.log(error));

//     return vehicles;
// }