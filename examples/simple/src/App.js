import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";

import { useLiff } from "react-liff";

function App() {
  const { error, isLoggedIn, isReady, liff } = useLiff();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      const profile = await liff.getProfile();
      setDisplayName(profile.displayName);
    })();
  }, [isLoggedIn, liff.getProfile]);

  const loginHandler = () => {
    liff.login();
  };
  const logoutHandler = () => {
    liff.logout();
  };

  const showDisplayName = () => {
    if (error) return <p>Something is wrong.</p>;
    if (!isReady) return <p>Loading...</p>;

    if (!isLoggedIn) {
      return (
        <button className="App-button" onClick={loginHandler} type="submit">
          Login
        </button>
      );
    }
    return (
      <>
        <p>Welcome to the react-liff demo app, {displayName}!</p>
        <button className="App-button" onClick={logoutHandler} type="submit">
          Logout
        </button>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {showDisplayName()}
      </header>
    </div>
  );
}

export default App;
