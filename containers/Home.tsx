import OutputCard from "../components/OutputCard";
import Spinner from "../components/Spinner";
import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { shtnrApiService } from "@/services/api/shtnr";
import toast from "react-hot-toast";
import AuthContext from "@/components/AuthContext";
import router from "next/router";
import CustomLinkCard from "@/components/CustomLinkCard";

require("dotenv").config();

const Home = () => {
  const [shortedUrl, setShortedUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [validCustom, setValidCustom] = useState(true);
  const [generatingShortedUrl, setGeneratingShortedUrl] = useState(false);
  const [validInput, setValidInput] = useState(true);
  const [placeholder, setPlaceholder] = useState("");
  const inputField = useRef<HTMLInputElement>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    router.push("/");
    return null;
  }

  const { isUserLoggedIn } = authContext;

  const handleOriginalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  const handleCustomLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // setShortedUrl(event.target.value);
    setCustomUrl(event.target.value);
  };

  const handleShortenUrl = async () => {
    let message;
    setGeneratingShortedUrl(true);

    if (originalUrl === "") {
      message = "Field cannot be empty";
      setValidInput(false);
      setPlaceholder(message);
      toast.error(message);
      setGeneratingShortedUrl(false);
      return;
    }

    try {
      let data = await shtnrApiService.postShtnr(originalUrl, customUrl);
      if (data) {
        setGeneratingShortedUrl(false);
        setValidInput(true);
        setShortedUrl(data.shtnd_url);
        setValidCustom(true);
        if (!customUrl || !data.shtnd_url) {
          setCustomUrl(data.shtnd_url);
        } else {
        }
      }
    } catch (err: any) {
      const responseData = err.response.data;

      if (responseData) {
        if (responseData.err_code === "E1002") {
          message = "Enter a valid URL";
          setValidInput(false);
          setPlaceholder(message);
          toast.error(message);
          setGeneratingShortedUrl(false);
        } else if (responseData.err_code === "E1003") {
          message = "Custom URL already exists";
          setValidCustom(false);
          setPlaceholder(message);
          toast.error(message);
          setGeneratingShortedUrl(false);
        } else {
          setValidInput(false);
          setPlaceholder("Unable to connect to the server");
          setGeneratingShortedUrl(false);
        }
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

  const handleCopy = () => {
    const link = `${process.env.NEXT_PUBLIC_SHTNR_FRONTEND}/${shortedUrl}`;
    navigator.clipboard.writeText(link);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <main>
        <div className="flex flex-col items-center">
          <h1
            className={
              "mt-10 animate-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text py-7 text-6xl font-bold tracking-tight text-transparent xs:text-6xl"
            }
          >
            shtnr
          </h1>

          {/* Card Elements */}
          <div className="mx-8 mb-32 mt-8 w-6/12 min-w-fit max-w-2xl ">
            <div className="card px-8 py-8">
              <p className="text-center font-bold text-gray-600">
                Enter URL to be shortened
              </p>

              <div className="flex flex-col justify-center py-4 md:flex-row">
                <div className="relative grow">
                  <input
                    ref={inputField}
                    type="text"
                    className={`h-8 w-full border-2 py-7 pl-7 pr-11 focus:border-black focus:outline-none xs:max-md:rounded-lg md:rounded-l-lg ${
                      validInput ? "border-gray-300" : "border-red-300"
                    }`}
                    placeholder={`${validInput ? "" : placeholder}`}
                    onChange={handleOriginalChange}
                    onKeyPress={handleKeyPress}
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center pl-2">
                    <button
                      type="submit"
                      className={clsx(
                        "focus:shadow-outline p-1 focus:outline-none",
                        {
                          hidden: !originalUrl,
                        },
                      )}
                      onClick={handleClearInput}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 stroke-gray-400 transition duration-500 ease-out hover:stroke-black"
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

                <div className="group relative xs:max-md:mt-3 xs:max-md:h-16">
                  <div className="absolute -inset-1 rounded-r-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-25 blur duration-500 ease-out group-hover:animate-text group-hover:opacity-100" />
                  <button
                    className="hover:bg-whitetransition relative h-full w-full cursor-pointer border-2 border-black bg-black px-3 py-2 text-xs font-bold uppercase tracking-wider text-white duration-500
            ease-out hover:scale-105 hover:animate-text hover:bg-gradient-to-r hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 xs:max-md:rounded-lg md:rounded-r-lg"
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
              className={`transistion duration-500 ease-out ${
                shortedUrl && !isUserLoggedIn
                  ? validInput
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-0"
              }`}
            >
              <OutputCard
                shortedUrl={shortedUrl}
                isUserLoggedIn={isUserLoggedIn}
                handleSuccessToast={handleSuccessToast}
                handleCopy={handleCopy}
              />
            </div>

            {/* custom links */}
            <div
              className={`transistion duration-500 ease-out ${
                isUserLoggedIn ? "opacity-100" : "opacity-0"
              }`}
            >
              <CustomLinkCard
                handleCustomLinkChange={handleCustomLinkChange}
                validCustom={validCustom}
                shortedUrl={shortedUrl}
                customUrl={customUrl}
                handleCopy={handleCopy}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
