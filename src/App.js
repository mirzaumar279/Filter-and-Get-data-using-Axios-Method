import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Table from "./Table";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
