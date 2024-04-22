import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthProvider, LocalizationProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <AuthProvider>
          <LocalizationProvider>
            <App />
          </LocalizationProvider>
        </AuthProvider>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
