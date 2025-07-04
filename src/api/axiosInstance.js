import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", BACKEND_URL);
export const axiosInstance = axios.create({
    baseURL: BACKEND_URL, 
    withCredentials: true,
});
