import { useState } from 'react';

import { Loginable } from './types';

export const useLoginStateManager = <T extends Loginable>(liff?: T): [boolean, T] => {
  const { isLoggedIn = () => false, login = () => {}, logout = () => {}, ...rest } = liff ?? {};
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const customLogin = () => {
    login();
    setLoggedIn(isLoggedIn());
  };
  const customLogout = () => {
    logout();
    setLoggedIn(isLoggedIn());
  };

  return [loggedIn, { ...rest, isLoggedIn, login: customLogin, logout: customLogout } as T];
};
