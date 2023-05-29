import axios from "axios";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { use, useEffect, useState } from "react";

const Url = () => {
  const router = useRouter();
  const { url } = router.query;

  const getFullLink = async () => {
    try {
      const response = await axios.post("http://localhost:4000/full", {
        shtnd_url: url,
      });
      console.log("shortened::::", url);
      console.log("full::::", response.data.url);
      if (response.data.url) {
        // window.location.replace(response.data.url);

        return {
          redirect: {
            destination: response.data.url,
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getFullLink();
  }, [router.isReady]);

  return (
    <div>
      <h1>test</h1>
      <button
        onClick={() => {
          // getFullLink({ url: url });
          getFullLink();
        }}
      >
        sdfsdfgsdfg
      </button>
    </div>
  );
};

export default Url;
