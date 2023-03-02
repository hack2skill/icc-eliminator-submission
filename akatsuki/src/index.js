import React from "react";
import { createRoot } from "react-dom/client";
// import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import Matchlist from "./Matchlist";
import BuyTickets from "./BuyTickets";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/matchlist" element={<Matchlist />} />
        <Route exact path="/buyTickets" element={<BuyTickets />} />
      </Routes>
    </Router>
  </React.StrictMode>
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
