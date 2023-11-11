import React from "react";
import RandomPage from "./components/random";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/random" element={<RandomPage />} />
      </Routes>
    </Router>
  );
};

export default App;
