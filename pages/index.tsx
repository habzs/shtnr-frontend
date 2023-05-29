import OutputCard from "@/components/OutputCard";
import { useState } from "react";

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
    console.log("originalUrl", originalUrl);
    setGeneratingShortedUrl(true);

    if (originalUrl === "") {
      setValidInput(false);
      setGeneratingShortedUrl(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/", {
        url: originalUrl,
      });

      setGeneratingShortedUrl(false);
      setValidInput(true);
      setShortedUrl(`localhost:3000/u/${response.data.shtnd_url}`);
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
        {/* <h1 className="py-7 text-6xl font-bold tracking-tight text-gray-900 sm:text-6xl mt-10 grad">
          shtnr
        </h1> */}
        <h1 className="animate-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent py-7 text-6xl font-bold tracking-tight sm:text-6xl mt-10">
          shtnr
        </h1>
        {/* Card Elements */}
        <div className="mt-8 max-w-2xl min-w-fit w-6/12 mx-8">
          <div className="card py-8 px-8">
            <p className="text-center font-bold text-gray-600">
              Enter URL to be shortened
            </p>

            <div className="flex py-4">
              {/* <form> */}
              <input
                type="text"
                className={`border-2 rounded-l-lg h-8 w-full p-7 focus:border-black focus:outline-none ${
                  validInput ? "border-gray-300" : "border-red-300"
                }`}
                placeholder={`${validInput ? "" : "Field cannot be empty"}`}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <button
                //     className="btn bg-black border-black border-2 text-white
                // hover:bg-white hover:text-black transition ease-out duration-500 hover:scale-105"
                className="btn bg-black border-black border-2 text-white
            hover:bg-whitetransition ease-out duration-500 hover:scale-105 hover:animate-text hover:bg-gradient-to-r hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500"
                onClick={() => {
                  handleShortenUrl();
                }}
              >
                {generatingShortedUrl ? (
                  <span>
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </span>
                ) : (
                  <span>shtnr</span>
                )}
              </button>
              {/* </form> */}
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
