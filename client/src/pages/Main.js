import React, { useState } from "react";
import "../styles/Main.css";
import Mouse from "./Mouse";
import { Link } from "react-router-dom";

function Main() {
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

  let str = currentAccount;
  let acc = str.slice(0, 6) + "..." + str.slice(38, 42).toUpperCase();
  console.log(acc);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <Mouse />
        </div>
        <br />
        {currentAccount ? (
          <div
            className="wallet_connect"
            onClick={connectWallet}
            style={{ background: "rgb(61, 205, 0)" }}
          >
            {acc}
          </div>
        ) : (
          <div className="wallet_connect" onClick={connectWallet}>
            Connect Wallet
          </div>
        )}
        <br />
        {currentAccount ? (
          <Link to="/donate">
            <div
              className="wallet_connect"
              style={{ background: "#111" }}
              currentAccount={currentAccount}
            >
              DONATE
            </div>
          </Link>
        ) : (
          <Link to="/#">
            <div className="wallet_connect" style={{ background: "#111" }}>
              DONATE
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Main;
