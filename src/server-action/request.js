

import { BACKEND_URL } from "@/constant/constant";
import axios from "axios";


export const publicRequest = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export const privateRequest = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});


privateRequest.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);