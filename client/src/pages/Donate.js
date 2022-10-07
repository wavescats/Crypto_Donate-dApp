import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { MoneyGiftsContract } from "../abi/contract";
import "../styles/Donate.css";

function Donate({ currentAccount }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [donateBalance, setDonateBalance] = useState("");
  const [read, setRead] = useState([]);

  const onNameChange = e => {
    setName(e.target.value);
  };

  const onMessageChange = e => {
    setMessage(e.target.value);
  };

  const moneyGifts = async () => {
    await MoneyGiftsContract.methods
      .GiftsMeg(name, message)
      .send({ from: currentAccount, value: ethers.utils.parseEther("0.001") });

    const memos = await MoneyGiftsContract.methods.getMemos().call();
    setRead(memos);
  };

  const withdraw = async () => {
    await MoneyGiftsContract.methods
      .withdrawTips()
      .send({ from: currentAccount });
  };

  useEffect(() => {
    async function baln() {
      const balan = await MoneyGiftsContract.methods.withdrawBalance().call();
      let bals = (balan / 10 ** 18).toFixed(6);
      setDonateBalance(bals);
    }
    baln();
  }, []);

  return (
    <>
      <div className="donate_container">
        <div className="donate_wrapper">
          <div className="flex_container">
            <span className="title_name">Sender / Name</span>
            <input
              className="input_area"
              onChange={onNameChange}
              placeholder="Name"
            />
            <br />
            <span className="title_name">Sender / Message</span>
            <textarea
              className="input_area"
              onChange={onMessageChange}
              placeholder="Message . . ."
              style={{ height: "5rem" }}
            />
            <br />
          </div>
          <button className="donate_btn" onClick={moneyGifts}>
            Donate
          </button>
          <br />

          {currentAccount &&
            read.map((memo, idx) => {
              return (
                <div className="donate_map" key={idx}>
                  <p>" {memo.message} "</p>
                  <p>From: {memo.name}</p>
                </div>
              );
            })}
        </div>

        <button
          className="withdraw_btn"
          onClick={withdraw}
          style={{ background: "#999", padding: "5px" }}
        >
          Withdraw
        </button>
        <span style={{ color: "#111" }}>
          {" "}
          Donate Balance : " {donateBalance} " ETH
        </span>
      </div>
    </>
  );
}

export default Donate;
