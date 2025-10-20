import axios from "axios";
import { getUserToken } from "../utils/authUtil";

const LibraryBackend = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

LibraryBackend.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      console.log("Inside Intercepter");
    }
    return config;
  },
  (Error) => {
    return Promise.reject(Error);
  }
);

export default LibraryBackend;
