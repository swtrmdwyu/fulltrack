import axios from "axios";

const tokenAPI = axios.create({
    baseURL: import.meta.env.VITE_BASE_TOKEN_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default tokenAPI;