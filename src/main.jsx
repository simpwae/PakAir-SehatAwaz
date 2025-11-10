import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AQIProvider } from "./context/AQIContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AQIProvider>
        <App />
      </AQIProvider>
    </StrictMode>
  </BrowserRouter>
);
