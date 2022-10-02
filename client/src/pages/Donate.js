import React, { useState } from "react";
import { ethers } from "ethers";
import { MoneyGiftsContract } from "../abi/contract";

function Donate({ currentAccount }) {
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
      <input onChange={onNameChange} placeholder="이름" />
      <input onChange={onMessageChange} placeholder="남기는말" />
      <button onClick={moneyGifts}>돈주기</button>
      <button onClick={getMemos}>조회</button>
      <button onClick={withdraw}>정산</button>
      {time}
    </div>
  );
}

export default Donate;
