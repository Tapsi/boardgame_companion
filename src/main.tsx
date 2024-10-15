import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import data from "../templates/data.json";
import { IntlProvider } from "react-intl";
import lang_de from "./locale/de.json";
import { addDecks as addDecksToDeckStorage } from "./model/deck";
import { updateValues as updateValueStorage } from "./model/values";

updateValueStorage(data.values);
addDecksToDeckStorage(data.decks);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntlProvider messages={lang_de} locale="de" defaultLocale="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </IntlProvider>
  </React.StrictMode>
);
