import OutputCard from "@/components/OutputCard";
import Spinner from "@/components/Spinner";
import { useState } from "react";
require("dotenv").config();

const Home = () => {
  const [shortedUrl, setShortedUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [generatingShortedUrl, setGeneratingShortedUrl] = useState(false);
  const [validInput, setValidInput] = useState(true);
  const axios = require("axios").default;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  const handleShortenUrl = async () => {
    setGeneratingShortedUrl(true);

    if (originalUrl === "") {
      setValidInput(false);
      setGeneratingShortedUrl(false);
      return;
    }

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SHTNR_BACKEND, {
        url: originalUrl,
      });

      setGeneratingShortedUrl(false);
      setValidInput(true);
      setShortedUrl(
        `${process.env.NEXT_PUBLIC_SHTNR_FRONTEND}/u/${response.data.shtnd_url}`
      );
    } catch (error) {
      setGeneratingShortedUrl(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleShortenUrl();
    }
  };

  return (
    <>
      <div className="bg-gray-100 h-screen flex flex-col items-center">
        {/* <h1 className="py-7 text-6xl font-bold tracking-tight text-gray-900 xs:text-6xl mt-10 grad">
          shtnr
        </h1> */}
        <h1
          className={
            "animate-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent py-7 text-6xl font-bold tracking-tight xs:text-6xl mt-10"
          }
        >
          shtnr
        </h1>
        {/* Card Elements */}
        <div className="mt-8 max-w-2xl min-w-fit w-6/12 mx-8">
          <div className="card py-8 px-8">
            <p className="text-center font-bold text-gray-600">
              Enter URL to be shortened
            </p>

            <div className="flex md:flex-row xs:flex-col flex-wrap justify-center py-4">
              <div className="md:w-3/4 xs:w-full">
                <input
                  type="text"
                  className={`border-2 md:rounded-l-lg xs:max-md:rounded-lg h-8 w-full p-7 focus:border-black focus:outline-none ${
                    validInput ? "border-gray-300" : "border-red-300"
                  }`}
                  placeholder={`${validInput ? "" : "Field cannot be empty"}`}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="xs:max-md:mt-3 xs:max-md:h-16">
                <button
                  className="w-full xs:max-md:rounded-lg md:rounded-r-lg py-2 px-3 uppercase text-xs font-bold tracking-wider cursor-pointer h-full bg-black border-black border-2 text-white
            hover:bg-whitetransition ease-out duration-500 hover:scale-105 hover:animate-text hover:bg-gradient-to-r hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500"
                  onClick={() => {
                    handleShortenUrl();
                  }}
                >
                  {generatingShortedUrl ? (
                    <span className="flex justify-center">
                      <Spinner />
                    </span>
                  ) : (
                    <span>shtnr</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* output card */}
          <div
            className={`transistion ease-out duration-500 ${
              shortedUrl
                ? validInput
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-0"
            }`}
          >
            <OutputCard shortedUrl={shortedUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
