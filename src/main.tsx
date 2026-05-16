import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProgressProvider } from "./contexts/ProgressContext";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </StrictMode>,
);
