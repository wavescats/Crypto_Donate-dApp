import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Donate from "./pages/Donate";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
