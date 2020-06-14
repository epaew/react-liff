import { useState } from 'react';

export const useLoginStateManager = (liff: any): [boolean, any] => {
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

  return [loggedIn, { ...rest, isLoggedIn, login: customLogin, logout: customLogout }];
};
