import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles/styles.scss";
import "./index.css";
import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
import "../node_modules/materialize-css/dist/css/materialize.min.css";
import { AuthProvider } from "./context/AuthContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="553781817618-7a5bc7unoq1esukv9174385n2bep9jui.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);
