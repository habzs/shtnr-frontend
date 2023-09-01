import OutputCard from "../components/OutputCard";
import Spinner from "../components/Spinner";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { shtnrApiService } from "@/services/api/shtnr";
import toast, { Toaster } from "react-hot-toast";
require("dotenv").config();

const Home = () => {
  const [shortedUrl, setShortedUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [generatingShortedUrl, setGeneratingShortedUrl] = useState(false);
  const [validInput, setValidInput] = useState(true);
  const [placeholder, setPlaceholder] = useState("");
  const inputField = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  const handleShortenUrl = async () => {
    setGeneratingShortedUrl(true);

    if (originalUrl === "") {
      setValidInput(false);
      setPlaceholder("Field cannot be empty");
      setGeneratingShortedUrl(false);
      return;
    }

    try {
      let data = await shtnrApiService.postShtnr(originalUrl);
      if (data) {
        setGeneratingShortedUrl(false);
        setValidInput(true);
        setShortedUrl(
          `${process.env.NEXT_PUBLIC_SHTNR_FRONTEND}/u/${data.shtnd_url}`
        );
      }
    } catch (err: any) {
      const responseData = err.response.data;
      if (responseData.err_code === "E1002") {
        setValidInput(false);
        setPlaceholder("Enter a valid URL");
        setGeneratingShortedUrl(false);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleShortenUrl();
    }
  };

  const handleClearInput = () => {
    if (inputField.current) {
      inputField.current.value = "";
      setOriginalUrl("");
    }
  };

  const handleSuccessToast = (message: string) => {
    toast.success(message);
  };

  const handleErrorToast = (message: string) => {
    toast.error(message);
  };

  useEffect(() => {
    if (placeholder !== "") {
      handleErrorToast(placeholder);
    }
  }, [placeholder]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="bg-gray-100 h-screen flex flex-col items-center">
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

            <div className="flex flex-col md:flex-row justify-center py-4">
              <div className="grow relative">
                <input
                  ref={inputField}
                  type="text"
                  className={`border-2 md:rounded-l-lg xs:max-md:rounded-lg h-8 w-full py-7 pl-7 pr-11 focus:border-black focus:outline-none ${
                    validInput ? "border-gray-300" : "border-red-300"
                  }`}
                  placeholder={`${validInput ? "" : placeholder}`}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
                <span className="absolute inset-y-0 right-3 flex items-center pl-2">
                  <button
                    type="submit"
                    className={clsx(
                      "p-1 focus:outline-none focus:shadow-outline",
                      {
                        hidden: !originalUrl,
                      }
                    )}
                    onClick={handleClearInput}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 hover:stroke-black transition ease-out duration-500 stroke-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              <div className="xs:max-md:mt-3 xs:max-md:h-16 relative group">
                <div className="absolute -inset-1 rounded-r-lg blur opacity-25 group-hover:opacity-100 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:animate-text ease-out duration-500" />
                <button
                  className="relative w-full xs:max-md:rounded-lg md:rounded-r-lg py-2 px-3 uppercase text-xs font-bold tracking-wider cursor-pointer h-full bg-black border-black border-2 text-white
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
            <OutputCard
              shortedUrl={shortedUrl}
              handleSuccessToast={handleSuccessToast}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
