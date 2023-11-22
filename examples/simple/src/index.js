import { LiffMockPlugin } from "@line/liff-mock";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { LiffProvider } from "react-liff";

const liffId = process.env.REACT_APP_LINE_LIFF_ID ?? "";
const mockEnabled = process.env.NODE_ENV !== "production";
const liffPlugins = [new LiffMockPlugin()];

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <LiffProvider liffId={liffId} mock={mockEnabled} plugins={liffPlugins}>
      <App />
    </LiffProvider>
  </StrictMode>,
);
