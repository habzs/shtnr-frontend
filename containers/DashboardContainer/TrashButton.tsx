import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Trash from "@/public/images/icons/trash.svg";
import clsx from "clsx";

interface TrashButtonProps {
  removeUrl: () => void;
}

const TrashButton: React.FC<TrashButtonProps> = ({ removeUrl }) => {
  const handleDelete = () => {
    removeUrl();
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="outline-none">
            <div
              className={clsx(
                "group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:cursor-pointer hover:border-black",
                {
                  "border-black": open,
                  "border-gray-500": !open,
                },
              )}
            >
              <Trash
                width={20}
                height={20}
                className={clsx(
                  "stroke-gray-500 transition-all group-hover:stroke-black",
                  {
                    "stroke-black": open,
                  },
                )}
              />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -right-4 z-10 mt-3 w-screen max-w-xs sm:px-0 md:right-0 md:max-w-sm">
              {({ close }) => (
                <div className="overflow-hidden rounded-lg bg-gray-50 p-4 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="flex justify-between p-2">
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        Delete permanently?
                      </span>
                      <span className="block text-sm text-gray-500">
                        There's no undoing this!
                      </span>
                    </div>

                    <button
                      type="button"
                      className="inline rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleDelete();
                        close();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default TrashButton;
