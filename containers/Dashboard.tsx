import AuthContext from "@/components/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import QrCodeIcon from "/public/images/icons/qr-code.svg";
import Clipboard from "@/public/images/icons/clipboard.svg";
import Trash from "@/public/images/icons/trash.svg";

const Dashboard = () => {
  const router = useRouter();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    router.push("/");
    return null;
  }

  const test = authContext.isUserLoggedIn;

  useEffect(() => {
    // checkLoginStatus();
    console.log("asasdasdd");
    console.log(test);
  }, []);

  return (
    <>
      <main>
        <div className="flex flex-col items-center">
          {/* Card Elements */}
          <div className="mx-8 mt-8 w-6/12 min-w-fit max-w-2xl">
            <div className="mx-auto mt-10 w-fit py-7 md:mx-0">
              <Link href="/">
                <div
                  className={
                    "group text-base font-bold tracking-tight text-gray-700 xs:text-6xl"
                  }
                >
                  <span
                    className={
                      "animate-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-30 group-hover:opacity-100"
                    }
                  >
                    shtnr
                  </span>
                  <div className="mx-2 inline-block transition-all ease-in-out group-hover:rotate-180">
                    →
                  </div>
                  <span className="group-hover:opacity-30">dashboard</span>
                </div>
              </Link>
            </div>

            <div className="card w-full px-8 py-8">
              <div className="flex flex-col justify-center space-y-3">
                <div className="flex space-x-2 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="basis-1/12 font-medium">#</span>
                  <span className="basis-8/12 font-medium">Description</span>
                  <span className="basis-3/12 text-start font-medium">
                    Action
                  </span>
                </div>

                <div className="rounded-lg bg-slate-50 px-4">
                  <div className="flex items-center space-x-2 py-3">
                    <span className="basis-1/12 font-medium">1</span>
                    <span className="basis-8/12 font-medium">
                      shtnr.owenlee.net/9Ps_
                    </span>

                    <div className="flex basis-3/12 flex-row gap-x-2">
                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <QrCodeIcon
                          width={20}
                          height={20}
                          className="fill-gray-500 transition-all group-hover:fill-black"
                        />
                      </div>

                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <Clipboard
                          width={20}
                          height={20}
                          className="stroke-gray-500 transition-all group-hover:stroke-black"
                        />
                      </div>

                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <Trash
                          width={20}
                          height={20}
                          className="stroke-gray-500 transition-all group-hover:stroke-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-b-2 border-gray-200" />

                  <div className="flex items-center space-x-2 py-3">
                    <span className="basis-1/12 font-medium">1</span>
                    <span className="basis-8/12 font-medium">
                      shtnr.owenlee.net/9Ps_
                    </span>
                    <div className="flex basis-3/12 flex-row gap-x-2">
                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <QrCodeIcon
                          width={20}
                          height={20}
                          className="fill-gray-500 transition-all group-hover:fill-black"
                        />
                      </div>

                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <Clipboard
                          width={20}
                          height={20}
                          className="stroke-gray-500 transition-all group-hover:stroke-black"
                        />
                      </div>

                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <Trash
                          width={20}
                          height={20}
                          className="stroke-gray-500 transition-all group-hover:stroke-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-b-2 border-gray-200" />

                  <div className="flex items-center space-x-2 py-3">
                    <span className="basis-1/12 font-medium">1</span>
                    <span className="basis-8/12 font-medium">
                      shtnr.owenlee.net/9Ps_
                    </span>
                    <div className="flex basis-3/12 flex-row gap-x-2">
                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <QrCodeIcon
                          width={20}
                          height={20}
                          className="fill-gray-500 transition-all group-hover:fill-black"
                        />
                      </div>

                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <Clipboard
                          width={20}
                          height={20}
                          className="stroke-gray-500 transition-all group-hover:stroke-black"
                        />
                      </div>

                      <div className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 transition-all hover:cursor-pointer hover:border-black">
                        <Trash
                          width={20}
                          height={20}
                          className="stroke-gray-500 transition-all group-hover:stroke-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
