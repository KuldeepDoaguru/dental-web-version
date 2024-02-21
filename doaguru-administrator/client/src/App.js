import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegisterWithSA from "./pages/RegisterWithSA";
import Header from "./pages/Header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/registerwith-super-admin"
            element={<RegisterWithSA />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
