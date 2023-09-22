import clsx from "clsx";

type OutputCardProps = {
  shortedUrl: string;
  handleSuccessToast: (message: string) => void;
  isUserLoggedIn: boolean;
  handleCopy: () => void;
};

const OutputCard: React.FC<OutputCardProps> = ({
  shortedUrl,
  isUserLoggedIn,
  handleCopy,
}) => {
  return (
    <>
      <div
        className={clsx("card mt-8 py-8 px-8", {
          hidden: !shortedUrl || isUserLoggedIn,
        })}
      >
        <p className="text-center font-bold text-gray-600">Shortened URL</p>

        <div className="flex py-4 relative">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg h-8 w-full py-7 pl-7 pr-11
              focus:border-black focus:outline-none"
            value={`${process.env.NEXT_PUBLIC_SHTNR_FRONTEND}${shortedUrl}`}
            readOnly={true}
          />
          <span className={"absolute inset-y-0 right-3 flex items-center pl-2"}>
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
              onClick={handleCopy}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-6 h-6 hover:stroke-black transition ease-out duration-500 stroke-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default OutputCard;
