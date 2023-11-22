import { Liff } from "@line/liff";
import { useEffect, useState } from "react";

export const useLoginStateManager = (liff: Liff | undefined): [boolean, Liff] => {
  const { isLoggedIn = () => false, login = () => {}, logout = () => {}, ...rest } = liff ?? {};
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    setLoginState(isLoggedIn());
  }, [isLoggedIn]);

  const customLogin: Liff["login"] = (...args) => {
    login(...args);
    setLoginState(isLoggedIn());
  };
  const customLogout: Liff["logout"] = () => {
    logout();
    setLoginState(isLoggedIn());
  };

  return [loginState, { ...rest, isLoggedIn, login: customLogin, logout: customLogout } as Liff];
};
