import clsx from "clsx";
require("dotenv").config();

interface CustomLinkCardProps {
  handleCustomLinkChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validCustom: boolean;
  customUrl: string;
  shortedUrl: string;
  handleCopy: () => void;
}

const CustomLinkCard: React.FC<CustomLinkCardProps> = ({
  handleCustomLinkChange,
  validCustom,
  customUrl,
  shortedUrl,
  handleCopy,
}) => {
  return (
    <>
      <div
        className={clsx("card mt-8 py-8 px-8", {
          //   hidden: !shortedUrl,
        })}
      >
        <p className="text-center font-bold text-gray-600">Custom URL</p>

        <div className="flex py-4 items-center justify-center space-x-3">
          <div className="basis-1/2">
            <input
              className="border-2 border-gray-300 rounded-l-lg h-8 py-7 pl-7 pr-4  focus:outline-none w-full text-gray-400"
              value={`${process.env.NEXT_PUBLIC_SHTNR_FRONTEND}/`}
              readOnly={true}
            />
          </div>

          <div className="relative basis-1/2">
            <input
              type="text"
              className={clsx(
                "relative border-2 border-gray-300 rounded-r-lg h-8 py-7 pl-7 focus:border-black focus:outline-none w-full",
                {
                  "border-lime-300":
                    shortedUrl && customUrl !== "" && validCustom,
                  "border-red-300": !validCustom,
                }
              )}
              maxLength={20}
              onChange={handleCustomLinkChange}
              value={customUrl}
            />
            <span
              className={clsx("absolute inset-y-0 right-3 flex items-center", {
                hidden: customUrl === "",
              })}
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
      </div>
    </>
  );
};

export default CustomLinkCard;
