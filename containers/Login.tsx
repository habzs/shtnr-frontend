import Spinner from "@/components/Spinner";
import { SignupResponse, shtnrApiService } from "@/services/api/shtnr";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface SignupProps {}

interface UserDetailsDTO {
  email: string;
  password: string;
}

const Login = () => {
  const [validForm, setValidForm] = useState({
    email: true,
    password: true,
  });
  const [userDetails, setUserDetails] = useState<UserDetailsDTO>({
    email: "",
    password: "",
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    let emptyFields = false;

    // check if any of the fields are empty
    Object.keys(userDetails).forEach((key) => {
      if (userDetails[key as keyof UserDetailsDTO] === "") {
        setValidForm((prev) => ({ ...prev, [key]: false }));
        emptyFields = true;
      } else {
        setValidForm((prev) => ({ ...prev, [key]: true }));
      }
    });

    if (emptyFields) {
      toast.error(`Fields cannot be empty!`);
      return;
    }

    try {
      setIsLoggingIn(true);
      setIsError(false);
      let data = await shtnrApiService.postLogin(
        userDetails.email,
        userDetails.password
      );
      if (data) {
        toast.success("Successfully signed up! Redirecting...");
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      if (err.response) {
        const res: SignupResponse = err.response.data;
        setIsError(true);
        if (res.errorsMsg) {
          toast.error(res.errorsMsg as string);
        }
      }
    }
    setIsLoggingIn(false);
  };

  useEffect(() => {
    // if (isSignedUp) {
    //   setTimeout(() => {
    //     window.location.href = "/";
    //   }, 1000);
    // }
  }, [isLoggedIn]);

  return (
    <>
      <main>
        <div className="flex flex-col items-center">
          {/* Card Elements */}
          <div className="mt-8 max-w-2xl min-w-fit w-6/12 mx-8">
            <div className="mx-auto md:mx-0 mt-10 py-7 w-fit">
              <Link href="/">
                <div
                  className={
                    "text-base font-bold tracking-tight xs:text-6xl text-gray-700 group"
                  }
                >
                  <span
                    className={
                      "animate-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-30 group-hover:opacity-100"
                    }
                  >
                    shtnr
                  </span>
                  <div className="inline-block group-hover:rotate-180 transition-all ease-in-out mx-2">
                    →
                  </div>
                  <span className="group-hover:opacity-30">log in</span>
                </div>
              </Link>
            </div>

            <div className="card py-8 px-8 max-w-xl">
              <div className="flex flex-col justify-center py-4">
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className={clsx(
                        "peer border-2 border-gray-300 rounded-lg h-8 w-full py-7 pl-7 pr-11 focus:border-black focus:outline-none mt-2",
                        {
                          "border-red-300": isError,
                        }
                      )}
                      placeholder=" "
                      onChange={handleSetValue}
                    />
                    <label
                      htmlFor="email"
                      className="absolute bg-white px-1 text-gray-400 scale-75 translate-y-0 -top-1 left-2 origin-[0]
                                peer-placeholder-shown:left-7 peer-placeholder-shown:top-[55%] peer-placeholder-shown:-translate-y-1/2 transition-all peer-placeholder-shown:scale-100
                                peer-focus:text-black peer-focus:scale-75 peer-focus:-translate-y-0 peer-focus:left-2 peer-focus:-top-1"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className={clsx(
                        "peer border-2 border-gray-300 rounded-lg h-8 w-full py-7 pl-7 pr-11 focus:border-black focus:outline-none mt-2",
                        {
                          "border-red-300": isError,
                        }
                      )}
                      placeholder=" "
                      onChange={handleSetValue}
                    />
                    <label
                      htmlFor="password"
                      className="absolute bg-white px-1 text-gray-400 scale-75 translate-y-0 -top-1 left-2  origin-[0]
                                peer-placeholder-shown:left-7 peer-placeholder-shown:top-[55%] peer-placeholder-shown:-translate-y-1/2 transition-all peer-placeholder-shown:scale-100
                                peer-focus:text-black peer-focus:scale-75 peer-focus:-translate-y-0 peer-focus:left-2 peer-focus:-top-1"
                    >
                      Password
                    </label>
                  </div>
                </div>

                <div className="mt-5 h-16 relative group">
                  <div className="absolute -inset-1 rounded-r-lg blur opacity-25 group-hover:opacity-100 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:animate-text ease-out duration-500" />
                  <button
                    className="relative w-full rounded-lg py-2 px-3 uppercase text-xs font-bold tracking-wider cursor-pointer h-full bg-black border-black border-2 text-white
        hover:bg-whitetransition ease-out duration-500 hover:scale-105 hover:animate-text hover:bg-gradient-to-r hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500"
                    onClick={() => {
                      !false && handleSubmit();
                      //   !isLoggedIn && handleSubmit();
                    }}
                    // type="submit"
                  >
                    {isLoggingIn ? (
                      <span className="flex justify-center">
                        <Spinner />
                      </span>
                    ) : isLoggedIn ? (
                      <span>CHANGE THIS TO TICK</span>
                    ) : (
                      <span>Log in</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
