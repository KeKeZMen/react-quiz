import axios from "axios";

export type ErrorResponseType = {
  error: string;
  status: number;
};

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const baseAxios = axios.create({
  baseURL: API_URL,
});

baseAxios.interceptors.response.use(
  (config) => config,
  (error) => {
    throw error.response?.data as ErrorResponseType;
  }
);
