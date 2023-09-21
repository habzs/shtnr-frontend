import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const Logout = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const logoutAccount = async () => {
    await authContext.logOut();
    toast.success("Logged out!");
  };

  const shouldLog = useRef(true); // handler to make sure useEffect only run once on render

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      logoutAccount();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, []);

  return null;
};

export default Logout;
