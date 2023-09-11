import axios from "axios";
require("dotenv").config();

// -=-=-= URL Shortener Endpoint =-=-=-

export const postShtnr = async (originalUrl: string) => {
  const res = await axios.post<ShtnrResponse>(
    process.env.NEXT_PUBLIC_SHTNR_BACKEND!,
    {
      url: originalUrl,
    }
  );

  return res.data;
};

export type ShtnrResponse = {
  url: string;
  shtnd_url: string;
  times_visited: number;
  created_at: Date;
};

// -=-=-= User auth signup endpoint =-=-=-

export const postSignup = async (
  email: string,
  username: string,
  password: string
) => {
  const res = await axios.post<SignupResponse>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/auth/signup`,
    {
      email: email,
      username: username,
      password: password,
    },
    { withCredentials: true }
  );

  return res.data;
};

type ErrorsType = {
  email?: string;
  username?: string;
  password?: string;
};

export type SignupResponse = {
  errorsMsg?: ErrorsType | string;
  status?: string;
};

// -=-=-= User auth login endpoint =-=-=-

export const postLogin = async (email: string, password: string) => {
  const res = await axios.post<LoginResponse>(
    `${process.env.NEXT_PUBLIC_SHTNR_BACKEND!}/auth/login`,
    { email: email, password: password },
    { withCredentials: true }
  );

  return res.data;
};

export type LoginResponse = {
  errorsMsg?: ErrorsType | string;
  status?: string;
};

export const shtnrApiService = {
  postShtnr,
  postSignup,
  postLogin,
};
