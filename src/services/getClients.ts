import api from "../api/api";
import Client from "../interfaces/Client";

export default async function getClients(token: string): Promise<Client[]> {
    const clients: Client[] = [];

    await api
    .get("plataform/clients", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        const clientsList: Client[] = response.data.map((client: Client) => client);
        clients.push(...clientsList);
    })
    .catch((error) => console.log(error));

    return clients;
}