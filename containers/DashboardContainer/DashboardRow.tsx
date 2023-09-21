import QrCodeIcon from "/public/images/icons/qr-code.svg";
import Clipboard from "@/public/images/icons/clipboard.svg";
import Trash from "@/public/images/icons/trash.svg";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import TrashButton from "./TrashButton";

interface DashboardRowProps {
  index: number;
  shtnd_url: string;
  url: string;
  generateQrCode: (url: string) => void;
  handleCopy: (url: string) => void;
  removeUrl: (shtnd_url: string) => void;
}

const DashboardRow: React.FC<DashboardRowProps> = ({
  index,
  shtnd_url,
  url,
  generateQrCode,
  handleCopy,
  removeUrl,
}) => {
  const fullShortened = `${process.env.NEXT_PUBLIC_SHTNR_FRONTEND}/${shtnd_url}`;

  return (
    <>
      <div className="hidden items-center py-3 md:flex">
        <span className="basis-1/12 font-medium ">{index}</span>
        <span className="basis-8/12 font-medium ">{fullShortened}</span>
        <span className="basis-8/12 truncate font-medium">{url}</span>

        <div className="flex basis-5/12 flex-row justify-end gap-x-2">
          <div
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black"
            onClick={() => generateQrCode(fullShortened)}
          >
            <QrCodeIcon
              width={20}
              height={20}
              className="fill-gray-500 transition-all group-hover:fill-black"
            />
          </div>
          <div
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black"
            onClick={() => {
              handleCopy(fullShortened);
            }}
          >
            <Clipboard
              width={20}
              height={20}
              className="stroke-gray-500 transition-all group-hover:stroke-black"
            />
          </div>
          <TrashButton
            removeUrl={() => {
              removeUrl(shtnd_url);
            }}
          />
        </div>
      </div>

      <div className="flex space-x-1 text-ellipsis py-3 md:hidden">
        <span className="basis-1/12 text-sm font-medium md:text-base">
          {index}
        </span>
        <div className="flex basis-8/12 flex-col truncate">
          <span className="text-sm font-medium md:text-base">{shtnd_url}</span>
          <span className="truncate text-sm font-medium text-gray-400 md:text-base">
            {url}
          </span>
        </div>

        <div className="flex basis-5/12 flex-row items-center justify-end gap-x-1 md:gap-x-2">
          <div
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black"
            onClick={() => generateQrCode(shtnd_url)}
          >
            <QrCodeIcon
              width={20}
              height={20}
              className="fill-gray-500 transition-all group-hover:fill-black"
            />
          </div>

          <div
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black"
            onClick={() => {
              handleCopy(shtnd_url);
            }}
          >
            <Clipboard
              width={20}
              height={20}
              className="stroke-gray-500 transition-all group-hover:stroke-black"
            />
          </div>

          <TrashButton
            removeUrl={() => {
              removeUrl(shtnd_url);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardRow;
