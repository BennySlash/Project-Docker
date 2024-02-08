import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserHistory } from "history";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import "../node_modules/materialize-css/dist/js/materialize.min.js";
import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
export const browserHistory = createBrowserHistory();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
