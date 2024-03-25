import Vehicle from "./Vehicle";

export interface FormatedVehicle extends Vehicle {
    address: string,
    client: string
}