import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import AppTheme from "./AppTheme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-CA">
        <Router>
          <ThemeProvider theme={AppTheme}>
            <App />
          </ThemeProvider>
        </Router>
      </LocalizationProvider>
    </SnackbarProvider>
  </>
);
