import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { useLiff } from 'react-liff';

function App() {
  const { error, liff, ready } = useLiff();

  const [displayName, setDisplayName] = useState('');
  const [loggedIn, setLoggedIn] = useState(liff.isLoggedIn());

  useEffect(() => {
    if (!loggedIn) return;

    (async () => {
      const profile = await liff.getProfile();
      setDisplayName(profile.displayName);
    })();
  });

  const loginHandler = () => {
    liff.login();
    setLoggedIn(liff.isLoggedIn());
  };
  const logoutHandler = () => {
    liff.logout();
    setLoggedIn(liff.isLoggedIn());
  };

  const showDisplayName = () => {
    if (error) return <p>Something is wrong.</p>;
    if (!ready) return <p>Loading...</p>;

    if (!loggedIn) {
      return <button className="App-button" onClick={loginHandler}>Login</button>;
    }
    return (
      <>
        <p>Welcome to the react-liff demo app, {displayName}!</p>
        <button className="App-button" onClick={logoutHandler}>Logout</button>
      </>
    );
  }

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
