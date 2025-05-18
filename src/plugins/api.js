import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 100000,
});


export function setupInterceptors() {

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers['authorization'] = `Bearer ${token}`;
            }
            return config;
        }
    );
}
export default api;


// axios.defaults.baseURL = 'http://0.0.0.0:19003/api'


