import { FormatedVehicle } from "./FormatedVehicle";

export default interface ReferencePoint {
    position: H.geo.Point | H.geo.MultiPoint,
    // vehicle: FormatedVehicle,
    description: string
}