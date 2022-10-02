import React, { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  const [account, setAccount] = useState("");

  const Connect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Main account={account} onClickConnect={Connect} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
