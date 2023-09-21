import axios from "axios";
require("dotenv").config();

// -=-=-= URL Shortener Endpoint =-=-=-

export const postShtnr = async (originalUrl: string, customUrl?: string) => {
  const res = await axios.post<ShtnrResponse>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/`,
    {
      url: originalUrl,
      customUrl: customUrl,
    },
    { withCredentials: true },
  );

  return res.data;
};

export type ShtnrResponse = {
  url: string;
  shtnd_url: string;
  times_visited: number;
  created_at: Date;
  user_id: string;
};

// -=-=-= URL Custom Shortener Endpoint =-=-=-

// export const postShtnrCustom = async (
//   originalUrl: string,
//   customUrl: string
// ) => {
//   const res = await axios.post<CustomShtnrResponse>(
//     `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/custom`,
//     {
//       url: originalUrl,
//       customUrl: customUrl,
//     },
//     { withCredentials: true }
//   );

//   return res.data;
// };

// export type CustomShtnrResponse = {
//   url: string;
//   shtnd_url: string;
//   times_visited: number;
//   created_at: Date;
// };

// -=-=-= User auth signup endpoint =-=-=-

export const postSignup = async (
  email: string,
  username: string,
  password: string,
) => {
  const res = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/auth/signup`,
    {
      email: email,
      username: username,
      password: password,
    },
    { withCredentials: true },
  );

  return res.data;
};

type ErrorsType = {
  email?: string;
  username?: string;
  password?: string;
};

export type AuthResponse = {
  errorsMsg?: ErrorsType | string;
  status?: string;
  email?: string;
  username?: string;
};

// -=-=-= User auth login endpoint =-=-=-

export const postLogin = async (email: string, password: string) => {
  const res = await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/auth/login`,
    { email: email, password: password },
    { withCredentials: true },
  );

  return res.data;
};

export const verifyToken = async () => {
  const res = await axios.post<VerifyTokenResponse>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/auth/verify-token`,
    {},
    { withCredentials: true },
  );

  return res.data;
};

export type VerifyTokenResponse = {
  id?: string;
  msg?: string;
};

// -=-=-= User auth logout endpoint =-=-=-

export const postLogout = async () => {
  const res = await axios.post<VerifyTokenResponse>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/auth/logout`,
    {},
    { withCredentials: true },
  );

  return res.data;
};

// -=-=-= User auth login endpoint =-=-=-
export const getCustomUrls = async () => {
  const res = await axios.post<ShtnrResponse[]>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/getCustomUrls`,
    {},
    { withCredentials: true },
  );

  return res.data;
};

// -=-=-= User auth login endpoint =-=-=-
export const removeUrl = async (shtnd_url: string) => {
  const res = await axios.post<ShtnrResponse[]>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/removeUrl`,
    { shtnd_url: shtnd_url },
    { withCredentials: true },
  );

  return res.data;
};

export type removeUrlResponse = {
  status: number;
  message: string;
};

export const shtnrApiService = {
  postShtnr,
  // postShtnrCustom,
  postSignup,
  postLogin,
  verifyToken,
  postLogout,
  getCustomUrls,
  removeUrl,
};
