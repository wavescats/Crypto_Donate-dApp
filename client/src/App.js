import React, { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Donate from "./pages/Donate";
import Main from "./pages/Main";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                currentAccount={currentAccount}
                connectWallet={connectWallet}
              />
            }
          />
          <Route
            path="/donate"
            element={<Donate currentAccount={currentAccount} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
