# react-liff

[![npm version](https://badge.fury.io/js/react-liff.svg)](https://badge.fury.io/js/react-liff)
[![Build Status](https://github.com/epaew/react-liff/workflows/Run%20Tests/badge.svg)](https://github.com/epaew/react-liff/actions?query=workflow%3A%22Run+Tests%22+branch%3A%22master%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/4ff4ef0a7a4343c6ae52/maintainability)](https://codeclimate.com/github/epaew/react-liff/maintainability)

A react context provider for LIFF (LINE Front-end Framework)

## Requirements

- [React](https://reactjs.org/) v18.0 or later
  - React Native is not supported.
- [LIFF SDK](https://developers.line.biz/en/docs/liff/release-notes/#liff-version-and-release-date) version >=2.19.1

## Getting started

### When you use NPM version of LIFF SDK (Recommended)

1. Create your React application development environment.
   - e.g. `npx create-react-app app-name`
2. Add `react-liff` to your app dependencies.
   ```sh
   npm i --save @line/liff react-liff
   # or
   yarn add @line/liff react-liff
   ```
3. Import `react-liff` to your app and use it!

   - An example of src/App.js

     ```javascript
     import React, { useEffect, useState } from 'react';
     import { useLiff } from 'react-liff';

     import './App.css';

     const App = () => {
       const [displayName, setDisplayName] = useState('');
       const { error, isLoggedIn, isReady, liff } = useLiff();

       useEffect(() => {
         if (!isLoggedIn) return;

         (async () => {
           const profile = await liff.getProfile();
           setDisplayName(profile.displayName);
         })();
       }, [liff, isLoggedIn]);

       const showDisplayName = () => {
         if (error) return <p>Something is wrong.</p>;
         if (!isReady) return <p>Loading...</p>;

         if (!isLoggedIn) {
           return (
             <button className="App-button" onClick={liff.login}>
               Login
             </button>
           );
         }
         return (
           <>
             <p>Welcome to the react-liff demo app, {displayName}!</p>
             <button className="App-button" onClick={liff.logout}>
               Logout
             </button>
           </>
         );
       };

       return (
         <div className="App">
           <header className="App-header">{showDisplayName()}</header>
         </div>
       );
     };

     export default App;
     ```

   - An example of src/index.js

     ```javascript
     import React from 'react';
     import ReactDOM from 'react-dom';
     import { LiffProvider } from 'react-liff';

     import './index.css';
     import App from './App';

     const liffId = process.env.REACT_APP_LINE_LIFF_ID;

     ReactDOM.render(
       <React.StrictMode>
         <LiffProvider liffId={liffId}>
           <App />
         </LiffProvider>
       </React.StrictMode>,
       document.getElementById('root')
     );
     ```

### When you use CDN version of LIFF SDK

1. Create your React application development environment.
   - e.g. `npx create-react-app app-name`
2. Add `react-liff` to your app dependencies.
   ```sh
   npm i --save react-liff
   # or
   yarn add react-liff
   ```
3. Update `index.html` to load LIFF SDK
   - https://developers.line.biz/en/docs/liff/developing-liff-apps/#developing-a-liff-app
     ```diff
     +    <script defer charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
     ```
4. Import `react-liff` to your app and use it!

## API

### LiffProvider props

- `liffId`: `string`, required
  - The ID of your LIFF application.
- `withLoginOnExternalBrowser`: `boolean`, optional
  - See the API reference of `liff.init()`. https://developers.line.biz/en/reference/liff/#initialize-liff-app-arguments
- `plugins`: `Array<LiffPlugin | [LiffPlugin, LiffPluginOption]>`, optional
  - List of LIFF plugin instances.
  - If you need to pass option to plugin, you can use the list of tuple `[pluginInstance, pluginOption]`.
- `callback`: `(liff: Liff) => Promise<void>`, optional
  - Callback function that fires after `liff.init()` has been succeeded.

### LiffConsumer / useLiff return values

- `error`: `unknown` (is `LiffError | undefined` in many cases)
  - Returns an error if `liff.init()` was failed.
- `isLoggedIn`: `boolean`
  - Returns whether the user is logged in.
- `isReady`: `boolean`
  - Returns `true` after `liff.init()` has successfully completed. Otherwise, returns `false`.
- `liff`: `Liff`
  - Returns liff object.

## CHANGELOG

[CHANGELOG](./CHANGELOG.md)

## LICENSE

[MIT](./LICENSE)
