import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";
// import CurrencyConverter from "./CurrencyConverter";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <CurrencyConverter /> */}
  </StrictMode>
);
