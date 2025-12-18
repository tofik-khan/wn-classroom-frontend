import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Footer from "./Footer";
import { AuthProvider } from "./AuthProvider.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/mainTheme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LicenseInfo } from "@mui/x-license";
import store from "./store.ts";
import { Provider } from "react-redux";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_X_PRO_LICENSE);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <App />
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
