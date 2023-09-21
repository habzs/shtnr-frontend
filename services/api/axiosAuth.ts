import axios from "axios";

console.log(
  "process.env.NEXT_PUBLIC_SHTNR_BACKEND",
  process.env.NEXT_PUBLIC_SHTNR_BACKEND,
);

export const axiosAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SHTNR_BACKEND}`,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  withCredentials: true,
});
