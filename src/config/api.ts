import axios from "axios";

const api = axios.create({
    baseURL: "https://api-fulltrack4.ftdata.com.br/",
})

// api.interceptors.response.use(
//     (response) => {
//         console.log(response)
//         return response
//     },
//     (error) => {
//         if(error.response.status === 400) {
//             console.log('ixi')
//         }
//     }
// )

export default api;