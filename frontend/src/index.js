import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SocketContextProvider from "./context/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketContextProvider>
    <App />
  </SocketContextProvider>
);