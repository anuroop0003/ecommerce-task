import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar.tsx";
import "./index.css";
import { persistor, store } from "./redux/store.ts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50",
    },
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
          <GlobalSnackbar />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
