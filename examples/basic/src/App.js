import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { useLiff } from 'react-liff';

function App() {
  const [displayName, setDisplayName] = useState('');
  const { error, liff, ready } = useLiff();

  useEffect(() => {
    (async () => {
      const profile = await liff.getProfile();
      setDisplayName(profile.displayName);
    })();
  }, [liff]);

  const showDisplayName = () => {
    if (error) return <p>Something is wrong.</p>;
    if (!ready) return <p>Loading...</p>;

    return <p>liff.getProfile().displayName: {displayName}</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {showDisplayName()}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
