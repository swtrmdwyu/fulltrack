import { AxiosPromise } from "axios";
import api from "../api/api";
import Vehicle from "../interfaces/Vehicle";
import { useQuery } from "@tanstack/react-query";

async function getVehicles(): AxiosPromise<Vehicle[]>{
    const response =await api.get<Vehicle[]>("maps/v2/last-positions/?ignitions=on,off,moving", { });

    return response;
}

export default function useGetvehicles() {
    const query = useQuery({
        queryKey: ["get-vehicles"],
        queryFn: getVehicles,
        refetchInterval: 10000
    })

    return {
        ...query,
        vehicles: query.data?.data
    }
}