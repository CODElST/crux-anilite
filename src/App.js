import React from "react";
import ScrollToTop from "./Functions/ScrollToTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrimaryRouting from "./PrimaryRouting";
import { ThemeProvider } from "@mui/material";
import "./Components/styles.css";
import darkTheme from "./Styles/styles";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <ScrollToTop>
          <div
            style={{
              background: darkTheme.palette.primary.background,
              position: "absolute",
              width: "100%",
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/*" element={<PrimaryRouting />} />
            </Routes>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}
