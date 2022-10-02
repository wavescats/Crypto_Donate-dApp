import { ethers } from "ethers";
import React, { useState } from "react";
import { MoneyGiftsContract } from "../abi/contract";

function Main() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState([]);

  const onNameChange = e => {
    setName(e.target.value);
    console.log(name);
  };

  const onMessageChange = e => {
    setMessage(e.target.value);
    console.log(message);
  };

  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
      const timestamp = new Date(1664686224);
      console.log(timestamp);
    } catch (error) {
      console.log(error);
    }
  };

  const moneyGifts = async () => {
    const gift = await MoneyGiftsContract.methods
      .GiftsMeg(name, message)
      .send({ from: currentAccount, value: ethers.utils.parseEther("0.001") });

    console.log(gift);
  };

  const withdraw = async () => {
    const withdraws = await MoneyGiftsContract.methods
      .withdrawTips()
      .send({ from: currentAccount });

    console.log(withdraws);
  };

  const getMemos = async () => {
    const memos = await MoneyGiftsContract.methods.getMemos().call();

    console.log(memos);
    for (let i = 0; i < memos.length; i++) {
      setTime(memos[i].timestamp);
    }
  };
  console.log(time);
  return (
    <div>
      <button onClick={isWalletConnected}>연결확인</button>
      <button onClick={connectWallet}>지갑연결</button>
      {currentAccount}
      <input onChange={onNameChange} placeholder="이름" />
      <input onChange={onMessageChange} placeholder="남기는말" />
      <button onClick={moneyGifts}>돈주기</button>
      <button onClick={getMemos}>조회</button>
      <button onClick={withdraw}>정산</button>
      {time}
    </div>
  );
}

export default Main;
