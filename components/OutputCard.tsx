import { useState } from "react";

type OutputCardProps = {
  shortedUrl: string;
};

const OutputCard: React.FC<OutputCardProps> = ({ shortedUrl }) => {
  const [toastBool, setToastBool] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortedUrl);
    setToastBool(true);
    setTimeout(() => {
      setToastBool(false);
    }, 2000);
  };

  return (
    <>
      <div className="card mt-8 py-8 px-8">
        <p className="text-center font-bold text-gray-600">Shortened URL</p>

        <div className="flex py-4 relative">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg h-8 w-full p-7
              focus:border-black focus:outline-none"
            value={shortedUrl}
          />
          <span
            className="absolute inset-y-0 right-3 flex items-center pl-2
            hover:"
          >
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
              onClick={handleCopy}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                // stroke="gray"
                className="w-6 h-6 hover:stroke-black transition ease-out duration-500 stroke-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </button>
          </span>
        </div>

        <div>{/* <button className="btn">Share</button> */}</div>
      </div>

      <div
        className={`transistion ease-out duration-500 ${
          toastBool ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="fixed bottom-0 right-0" id="toastBar">
          <div className="flex bg-white rounded-lg shadow-lg border-2 border-lime-400 p-4 m-4">
            <div className="inline-flex mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="gray"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="inline-flex flex-shrink-0 text-gray-600">
              Copied to clipboard.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutputCard;
