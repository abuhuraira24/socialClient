import React, { useContext } from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

import { GlobalStyles } from "./Styles/GlobalStyles";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { ApolloProvider } from "@apollo/client";

import client from "./hooks/ApolloClient";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />

      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
