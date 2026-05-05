import axios from "axios";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "Axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;