import api from "../api/api";
import { Address } from "../interfaces/Address";

export interface AddressRequestParams {
    "code": number,
    "latitude": string,
    "longitude": string
}

export default async function getAddress(data: AddressRequestParams[]) {
    const address: Address[] = [];

    await api
    .post("address/v1/reverse/", 
        data, 
        {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // }
        }
    )
    .then((response) => {
        const addressList: Address[] = response.data.map((address: Address) => address);
        address.push(...addressList);
    })
    .catch((error) => console.log(error));

    return address;
}