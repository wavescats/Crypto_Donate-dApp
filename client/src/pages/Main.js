import React from "react";
import "../styles/Main.css";
import Mouse from "./Mouse";
import { Link } from "react-router-dom";

function Main({ currentAccount, connectWallet, disConnectWallet }) {
  let str = currentAccount;
  let acc = str.slice(0, 6) + "..." + str.slice(38, 42).toUpperCase();

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <Mouse />
          </div>
          <br />
          {currentAccount ? (
            <div
              className="wallet_connect"
              style={{ background: "rgb(61, 205, 0)" }}
              onClick={disConnectWallet}
            >
              <span style={{ fontSize: "1rem" }}>{acc}</span>Disconnect
            </div>
          ) : (
            <div className="wallet_connect" onClick={connectWallet}>
              Connect Wallet
            </div>
          )}
          <br />
          {currentAccount ? (
            <Link to="/donate">
              <div className="wallet_connect" style={{ background: "#111" }}>
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
    </>
  );
}

export default Main;
