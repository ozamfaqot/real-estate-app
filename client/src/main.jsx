import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-71jqxqecyrmwd3ws.us.auth0.com"
      clientId="TbaHgHrBJDNbuDW3JiG8I7X5iQvD2MOM"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
      {/* <MantineProvider>
        <App />
      </MantineProvider> */}
    </Auth0Provider>
  </React.StrictMode>
);
