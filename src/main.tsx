import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";

import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SkeletonTheme
        width={"100vw"}
        height={"100vh"}
        baseColor="#111"
        highlightColor="#444"
      >
        <DarkModeProvider>
          <App />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
          />
        </DarkModeProvider>
      </SkeletonTheme>
    </AuthProvider>
  </StrictMode>
);
