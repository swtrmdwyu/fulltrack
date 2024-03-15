import axios from "axios";

const tokenAPI = axios.create({
    baseURL: "https://dev.api-fulltrack4.ftdata.com.br/token",
    headers: {
        "Content-Type": "application/json"
    }
})

tokenAPI.interceptors.response.use();

export default tokenAPI;