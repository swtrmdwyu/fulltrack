import { FenceVehicle } from "../Contexts/FenceContext"
import Client from "./Client"

export default interface FanceData {
    description: string,
    colors: {
        strokeColor: string,
        fillColor: string
    },
    client: Client,
    vehicles: FenceVehicle[]
}