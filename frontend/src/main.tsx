import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.tsx";
import axios from "axios";

axios.defaults.baseURL =
  "https://workplace-info-portal-be.onrender.com:5000/infoportal";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ChakraProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ChakraProvider>
  </AuthProvider>
);
