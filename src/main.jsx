import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserHistory } from "history";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="553781817618-7a5bc7unoq1esukv9174385n2bep9jui.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
