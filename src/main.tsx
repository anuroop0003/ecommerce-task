import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar.tsx";
import "./index.css";
import store from "./redux/store.ts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
        <GlobalSnackbar />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
