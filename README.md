# react-liff
[![npm version](https://badge.fury.io/js/react-liff.svg)](https://badge.fury.io/js/react-liff)
[![Build Status](https://github.com/epaew/react-liff/workflows/Run%20Tests/badge.svg)](https://github.com/epaew/react-liff/actions?query=workflow%3A%22Run+Tests%22+branch%3A%22master%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/4ff4ef0a7a4343c6ae52/maintainability)](https://codeclimate.com/github/epaew/react-liff/maintainability)

A react context provider for LIFF (LINE Front-end Framework)

## Requirements
* [React](https://reactjs.org/) v16.14 or later
  * React Native is not supported.
* [LIFF SDK](https://developers.line.biz/en/docs/liff/release-notes/#liff-version-and-release-date) version >=2.9.0

## Getting started
### When you use NPM version of LIFF SDK (Recommended)
1. Create your React application development environment.
    * e.g. `npx create-react-app app-name`
2. Add `react-liff` to your app dependencies.
    ```sh
    npm i --save @line/liff react-liff
    # or
    yarn add @line/liff react-liff
    ```
3. Import `react-liff` to your app and use it!
    * An example of src/App.js
        ```javascript
        import React, { useEffect, useState } from 'react';
        import { useLiff } from 'react-liff';

        import './App.css';

        const App = () => {
          const [displayName, setDisplayName] = useState('');
          const { error, liff, isLoggedIn, ready } = useLiff();

          useEffect(() => {
            if (!isLoggedIn) return;

            (async () => {
              const profile = await liff.getProfile();
              setDisplayName(profile.displayName);
            })();
          }, [liff, isLoggedIn]);

          const showDisplayName = () => {
            if (error) return <p>Something is wrong.</p>;
            if (!ready) return <p>Loading...</p>;

            if (!isLoggedIn) {
              return <button className="App-button" onClick={liff.login}>Login</button>;
            }
            return (
              <>
                <p>Welcome to the react-liff demo app, {displayName}!</p>
                <button className="App-button" onClick={liff.logout}>Logout</button>
              </>
            );
          }

          return (
            <div className="App">
              <header className="App-header">{showDisplayName()}</header>
            </div>
          );
        }

        export default App;
        ```
    * An example of src/index.js
        ```javascript
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { LiffProvider } from 'react-liff';

        import './index.css';
        import App from './App';

        const liffId = process.env.REACT_APP_LINE_LIFF_ID;
        const stubEnabled = process.env.NODE_ENV !== 'production';

        ReactDOM.render(
          <React.StrictMode>
            <LiffProvider liffId={liffId} stubEnabled={stubEnabled}>
              <App />
            </LiffProvider>
          </React.StrictMode>,
          document.getElementById('root')
        );
        ```

### When you use CDN version of LIFF SDK
1. Create your React application development environment.
    * e.g. `npx create-react-app app-name`
2. Add `react-liff` to your app dependencies.
    ```sh
    npm i --save react-liff
    # or
    yarn add react-liff
    ```
3. Update `index.html` to load LIFF SDK
    * https://developers.line.biz/en/docs/liff/developing-liff-apps/#developing-a-liff-app
        ```diff
        +    <script defer charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
        ```
4. Import `react-liff` to your app and use it!

## API
### LiffProvider props
* `liffId`: `string`, required
  * The ID of your LIFF application.
  * When you using stubs, you can specify empty string.
* `stubEnabled`: `boolean | Object | undefined`, optional
  * `false` or `undefined`: Provider uses LIFF SDK (for Production).
  * `true`: Provider uses stubs defined in library.
  * `Object`: Provider uses the stubs you specified here.

### LiffConsumer / useLiff return values
* `error`: `LiffError | undefined`
  * Returns LiffError if `liff.init()` failed.
* `isLoggedIn`: `boolean`
  * Returns whether the user is logged in.
* `ready`: `boolean`
  * Returns `true` after `liff.init()` or stub setup has successfully completed.
* `liff`: `Liff`
  * Returns liff object.

## CHANGELOG
[CHANGELOG](./CHANGELOG.md)

## LICENSE
[MIT](./LICENSE)
