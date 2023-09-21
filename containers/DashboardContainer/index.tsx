import AuthContext from "@/components/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import DashboardRow from "./DashboardRow";
import QrModal from "./QrModal";
import { ShtnrResponse, shtnrApiService } from "@/services/api/shtnr";

const DashboardContainer = () => {
  const router = useRouter();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [customUrls, setCustomUrls] = useState<ShtnrResponse[]>([]);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    router.push("/");
    return null;
  }

  function closeModal() {
    setIsQRModalOpen(false);
  }

  const generateQrCode = (url: string) => {
    setQrCodeUrl(url);
    setIsQRModalOpen(true);
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  const removeUrl = async (shtnd_url: string) => {
    try {
      await shtnrApiService.removeUrl(shtnd_url);
      loadCustomUrls();
    } catch (err: any) {
      const responseData = err.response.data;
    }
  };

  const loadCustomUrls = async () => {
    try {
      let data = await shtnrApiService.getCustomUrls();
      if (data) {
        setCustomUrls(data);
      }
    } catch (err: any) {
      const responseData = err.response.data;

      if (responseData) {
      }
    }
  };

  const shouldLoad = useRef(true); // handler to make sure useEffect only run once on render
  useEffect(() => {
    if (shouldLoad.current) {
      shouldLoad.current = false;
      loadCustomUrls();
    }
  }, []);

  return (
    <>
      <main>
        <div className="flex flex-col items-center">
          {/* Card Elements */}
          <div className="mx-8 mb-32 mt-8 w-full">
            <div className="mt-10 w-fit py-7 md:mx-0">
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

            <div className="card mb-10 px-3 py-2 md:px-8 md:py-8">
              <div className="flex flex-col justify-center">
                <div className="hidden rounded-lg bg-slate-100 px-4 py-3 md:flex">
                  <span className="basis-1/12 font-medium">#</span>
                  <span className="basis-8/12 font-medium">Shortened</span>
                  <span className="basis-8/12 font-medium">URL</span>
                  <span className="basis-5/12 text-end font-medium">
                    Action
                  </span>
                </div>

                <div className="flex space-x-2 rounded-lg bg-slate-100 px-4 py-3 md:hidden">
                  <span className="basis-1/12 text-sm font-medium md:text-base">
                    #
                  </span>
                  <span className="basis-8/12 text-sm font-medium md:text-base">
                    Shortened/URL
                  </span>
                  <span className="basis-5/12 text-end text-sm font-medium md:text-base">
                    Action
                  </span>
                </div>

                <div className="mt-3 rounded-lg bg-slate-100 px-4 text-gray-800">
                  {customUrls.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <DashboardRow
                          index={index + 1}
                          shtnd_url={item.shtnd_url}
                          url={item.url}
                          removeUrl={removeUrl}
                          generateQrCode={generateQrCode}
                          handleCopy={handleCopy}
                        />

                        {index < customUrls.length - 1 && (
                          <div className="border-b-2 border-gray-200" />
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <QrModal
          isQRModalOpen={isQRModalOpen}
          closeModal={closeModal}
          qrCodeUrl={qrCodeUrl}
        />
      </main>
    </>
  );
};

export default DashboardContainer;
