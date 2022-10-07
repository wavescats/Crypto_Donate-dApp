import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Donate from "./pages/Donate";
import Main from "./pages/Main";

function App() {
  const [userAccount, setUserAccount] = useState({
    isConnect: "",
    Account: "",
  });

  let walletConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      localStorage.setItem("isConnected", accounts);
      setUserAccount({ Account: accounts[0] });
    }
    if (accounts.length === undefined) {
      localStorage.removeItem("isConnected");
      setUserAccount({ Account: "" });
    }
  };

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (addressArray.length > 0) {
          setUserAccount({ Account: addressArray[0] });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  function logout() {
    localStorage.removeItem("isConnected");
    setUserAccount({ Account: "" });
  }

  useEffect(() => {
    if (userAccount.Account !== null) {
      getCurrentWalletConnected();
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                currentAccount={userAccount.Account}
                connectWallet={walletConnect}
                disConnectWallet={logout}
              />
            }
          />
          <Route
            path="/donate"
            element={<Donate currentAccount={userAccount.Account} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
