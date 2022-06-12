import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import { LiffProvider } from 'react-liff';

const liffId = process.env.REACT_APP_LINE_LIFF_ID ?? '';
const stubEnabled = process.env.NODE_ENV !== 'production';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <LiffProvider liffId={liffId} stubEnabled={stubEnabled}>
      <App />
    </LiffProvider>
  </StrictMode>
);
