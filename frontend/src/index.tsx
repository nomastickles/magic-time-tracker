import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import RetroBackground from "./RetroBackground";
import { ContextProvider } from "./context";
import App from "./App";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(
  document.getElementById("retrobg") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssVarsProvider>
          <RetroBackground />
          <App />
        </CssVarsProvider>
      </LocalizationProvider>
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
