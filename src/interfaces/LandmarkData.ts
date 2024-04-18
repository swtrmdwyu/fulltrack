import Client from "./Client";

export default interface LandmarkData {
    color: string,
    client: Client | null,
    description: string,
    address: string
}