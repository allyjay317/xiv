import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserInfo } from "./types";

type SiteValues = {
  isLoggedIn: boolean;
  userInfo?: UserInfo;
  logOut: () => void;
  logIn: (discordInfo: any) => void;
};

const defaultValues: SiteValues = {
  isLoggedIn: false,
  userInfo: undefined,
  logOut: () => {},
  logIn: () => {},
};

const SiteContext = React.createContext(defaultValues);

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  return context;
};

export const SiteProvider = (props: any) => {
  const [discordAuth, setDiscordAuth] = useState(
    JSON.parse(localStorage.getItem("discord_auth") ?? "{}")
  );
  const [userInfo, setUserInfo] = useState<undefined | UserInfo>();
  const isLoggedIn = discordAuth ?? false;

  useEffect(() => {
    if (discordAuth) {
      axios({
        method: "get",
        url: "https://discord.com/api/users/@me",
        headers: {
          Authorization: `${discordAuth.token_type} ${discordAuth.access_token}`,
        },
      }).then((info) => {
        setUserInfo(info.data as UserInfo);
      });
    }
  }, [discordAuth]);

  const logOut = () => {
    localStorage.removeItem("discord_auth");
    setUserInfo(undefined);
    setDiscordAuth(null);
  };

  const logIn = (discordInfo: any) => {
    localStorage.setItem("discord_auth", JSON.stringify(discordInfo));
    setDiscordAuth(discordInfo);
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
