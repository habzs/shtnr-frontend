import axios from "axios";
require("dotenv").config();

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

export const shtnrApiService = {
  postShtnr,
};
