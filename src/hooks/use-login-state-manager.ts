import { useEffect, useState } from 'react';

import { Loginable } from '../types';

export const useLoginStateManager = <T extends Loginable>(liff?: T): [boolean, T] => {
  const { isLoggedIn = () => false, login = () => {}, logout = () => {}, ...rest } = liff ?? {};
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    setLoginState(isLoggedIn());
  }, [isLoggedIn]);

  const customLogin = () => {
    login();
    setLoginState(isLoggedIn());
  };
  const customLogout = () => {
    logout();
    setLoginState(isLoggedIn());
  };

  return [loginState, { ...rest, isLoggedIn, login: customLogin, logout: customLogout } as T];
};
