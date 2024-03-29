import Spinner from "@/components/Spinner";
import { AuthResponse, shtnrApiService } from "@/services/api/shtnr";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface SignupProps {}

interface UserDetailsDTO {
  email: string;
  username: string;
  password: string;
}

const Signup = () => {
  const router = useRouter();
  const [validForm, setValidForm] = useState({
    email: true,
    username: true,
    password: true,
  });
  const [userDetails, setUserDetails] = useState<UserDetailsDTO>({
    email: "",
    username: "",
    password: "",
  });

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

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
      console.log("invalid!");
      toast.error(`Fields cannot be empty!`);
      return;
    }

    try {
      setIsSigningUp(true);
      let data = await shtnrApiService.postSignup(
        userDetails.email,
        userDetails.username,
        userDetails.password,
      );
      if (data) {
        toast.success("Successfully signed up! Redirecting...");
        if (data.email) {
          localStorage.setItem("user", JSON.stringify(data.email));
        }
        setIsSignedUp(true);
      }
    } catch (err: any) {
      if (err.response) {
        const res: AuthResponse = err.response.data;
        if (res.errorsMsg) {
          Object.keys(res["errorsMsg"]).forEach((key: string) => {
            setValidForm((prev) => ({ ...prev, [key]: false }));

            toast.error(
              res["errorsMsg"]![key as keyof (typeof res)["errorsMsg"]],
            );
          });
        }
      }
    }
    setIsSigningUp(false);
  };

  useEffect(() => {
    if (isSignedUp) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  }, [isSignedUp]);

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
                  <span className="group-hover:opacity-30">sign up</span>
                </div>
              </Link>
            </div>

            <div className="card max-w-xl px-8 py-8">
              <div className="flex flex-col justify-center py-4">
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className={clsx(
                        "peer mt-2 h-8 w-full rounded-lg border-2 border-gray-300 py-7 pl-7 pr-11 focus:border-black focus:outline-none",
                        {
                          "border-red-300": !validForm.email,
                        },
                      )}
                      placeholder=" "
                      onChange={handleSetValue}
                    />
                    <label
                      htmlFor="email"
                      className="absolute -top-1 left-2 origin-[0] translate-y-0 scale-75 bg-white px-1 text-gray-400
                                transition-all peer-placeholder-shown:left-7 peer-placeholder-shown:top-[55%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
                                peer-focus:-top-1 peer-focus:left-2 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-black"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      className={clsx(
                        "peer mt-2 h-8 w-full rounded-lg border-2 border-gray-300 py-7 pl-7 pr-11 focus:border-black focus:outline-none",
                        {
                          "border-red-300": !validForm.username,
                        },
                      )}
                      placeholder=" "
                      onChange={handleSetValue}
                    />
                    <label
                      htmlFor="username"
                      className="absolute -top-1 left-2 origin-[0] translate-y-0 scale-75 bg-white px-1 text-gray-400
                      transition-all peer-placeholder-shown:left-7 peer-placeholder-shown:top-[55%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
                      peer-focus:-top-1 peer-focus:left-2 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-black"
                    >
                      Username
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className={clsx(
                        "peer mt-2 h-8 w-full rounded-lg border-2 border-gray-300 py-7 pl-7 pr-11 focus:border-black focus:outline-none",
                        {
                          "border-red-300": !validForm.password,
                        },
                      )}
                      placeholder=" "
                      onChange={handleSetValue}
                    />
                    <label
                      htmlFor="password"
                      className="absolute -top-1 left-2 origin-[0] translate-y-0 scale-75 bg-white px-1  text-gray-400
                                transition-all peer-placeholder-shown:left-7 peer-placeholder-shown:top-[55%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
                                peer-focus:-top-1 peer-focus:left-2 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-black"
                    >
                      Password
                    </label>
                  </div>
                </div>

                <div className="group relative mt-5 h-16">
                  <div className="absolute -inset-1 rounded-r-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-25 blur duration-500 ease-out group-hover:animate-text group-hover:opacity-100" />
                  <button
                    className="hover:bg-whitetransition relative h-full w-full cursor-pointer rounded-lg border-2 border-black bg-black px-3 py-2 text-xs font-bold uppercase tracking-wider
        text-white duration-500 ease-out hover:scale-105 hover:animate-text hover:bg-gradient-to-r hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500"
                    onClick={() => {
                      !isSignedUp && handleSubmit();
                    }}
                    // type="submit"
                  >
                    <div className="flex justify-center">
                      {isSigningUp ? (
                        <Spinner />
                      ) : isSignedUp ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-8 w-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <span>Sign up</span>
                      )}
                    </div>
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

export default Signup;
