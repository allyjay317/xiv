import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserInfo } from "./types";

type SiteValues = {
  isLoggedIn: boolean;
  userInfo?: UserInfo;
  logOut: () => void;
  logIn: (discordInfo: any) => void;
  avatar?: string
};

const defaultValues: SiteValues = {
  isLoggedIn: false,
  userInfo: undefined,
  logOut: () => {},
  logIn: () => {},
};

const SiteContext = React.createContext(defaultValues);
const apiUrl = import.meta.env.VITE_SERVER_URL

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  return context;
};

export const SiteProvider = (props: any) => {
  const [id, setId] = useState<string | null>(
    localStorage.getItem("id")
  );
  const [userInfo, setUserInfo] = useState<undefined | UserInfo>();
  const isLoggedIn = !!id

  useEffect(() => {
    if (id) {
      axios({
        method: "get",
        url: `${apiUrl}/user`,
        params: {
          id
        }
      }).then((info) => {
        setUserInfo(info.data as UserInfo);
      }).catch(e => {
        console.log(e)
      });
    }
  }, [id]);

  const logOut = () => {
    localStorage.removeItem("id");
    setUserInfo(undefined);
    setId(null);
  };

  const logIn = (id: string) => {
    localStorage.setItem("id", id);
    setId(id)
  };

  return (
    <SiteContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        logOut,
        logIn,
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};
