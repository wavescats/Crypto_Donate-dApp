const hre = require("hardhat");
const abi = require("../artifacts/contracts/MoneyGifts.sol/MoneyGifts.json");

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  // Goerli 테스트넷에 배포된 주소 / ABI
  const contractAddress = "0x9bADD7AB6c2d6929bf8483Db8aBD9D71EFd49E29";
  const contractABI = abi.abi;

  // Get the node connection and wallet connection.
  const provider = new hre.ethers.providers.AlchemyProvider(
    "goerli",
    process.env.GOERLI_API_KEY
  );

  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // 프론트엔드에서 컨트랙트 호출
  const MoneyGifts = new hre.ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // 잔액 확인 1
  console.log(
    "current balance of owner: ",
    await getBalance(provider, signer.address),
    "ETH"
  );

  const contractBalance = await getBalance(provider, MoneyGifts.address);

  // 잔액 확인 2
  console.log(
    "current balance of contract: ",
    await getBalance(provider, MoneyGifts.address),
    "ETH"
  );

  // 컨트랙트에 잔액이 있으면 실행 👉 배포자 주소로 전송
  if (contractBalance !== "0.0") {
    console.log("withdrawing funds..");
    const withdrawTxn = await MoneyGifts.withdrawTips();
    await withdrawTxn.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  // 잔액 확인 3
  console.log(
    "current balance of owner: ",
    await getBalance(provider, signer.address),
    "ETH"
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
