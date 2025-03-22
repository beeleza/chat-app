import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5051/api",
    withCredentials: true
});
