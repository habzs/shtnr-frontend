import { shtnrApiService } from "@/services/api/shtnr";
import React, { useState, createContext } from "react";

interface AuthContextProps {
  isLoggedIn: () => Promise<boolean>;
  logOut: () => Promise<void>;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const isLoggedIn = async () => {
    let data = await shtnrApiService.verifyToken();
    if (data.id) {
      setIsUserLoggedIn(true);
      return true;
    }
    return false;
  };

  const getUserId = async () => {
    let data = await shtnrApiService.verifyToken();
    if (data.id) {
      return data.id;
    }
    return null;
  };

  const logOut = async () => {
    let data = await shtnrApiService.postLogout();
    if (data) {
      setIsUserLoggedIn(false);
    }
  };

  const store: AuthContextProps = {
    isLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn,
    logOut,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export default AuthContext;
