import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import Task from "./Components/Task";
import Form from "./Components/Form";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/form/:id" element={<Form />}/>
        <Route path="/" element={<Task/>} />
      </Routes>
    </HashRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
