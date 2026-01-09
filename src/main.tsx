import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./AuthProvider.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/mainTheme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LicenseInfo } from "@mui/x-license";
import store from "./store.ts";
import { Provider } from "react-redux";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_X_PRO_LICENSE);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * Disable window refresh when user navigates away from window
       */
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
