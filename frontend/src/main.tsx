import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "highlight.js/styles/github-dark.css";

import App from "./App";

import { ThemeProvider } from "./providers/ThemeProvider";

import "@fontsource/geist-sans";

import "./styles/globals.css";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </ClerkProvider>
  </StrictMode>
  
);