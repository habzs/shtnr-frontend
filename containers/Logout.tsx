import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
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

  useEffect(() => {
    logoutAccount();
    router.push("/");
  }, []);

  return null;
};

export default Logout;
