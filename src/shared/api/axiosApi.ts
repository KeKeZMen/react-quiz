import { sleep } from "@shared/lib";
import axios, { AxiosRequestConfig } from "axios";

export type ErrorResponseType = {
  data: any;
  status: number;
};

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const baseAxios = axios.create({
  baseURL: API_URL,
});

baseAxios.interceptors.response.use(
  (config) => config,
  (error) => {
    throw error.response as ErrorResponseType;
  }
);

export const axiosWithDelay = async <T>(
  config: AxiosRequestConfig,
  delayTime = 0
) => {
  await sleep(delayTime);
  return baseAxios<T>(config);
};
