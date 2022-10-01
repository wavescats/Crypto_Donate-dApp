//
// hre.waffle.provider.getBalance 👉 지갑 계정 잔액을 읽기
// hre.ethers.getContractFactory 👉 컨트랙트 배포하기
// hre.ethers.utils.parseEther 👉 Ether 단위 형식화할 수 있는 기능

const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// 잔고 출력
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

// 컨트랙트 구조체 출력
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

async function main() {
  // 구조체 순서대로
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // 컨트랙트 배포
  const MoneyMeGifts = await hre.ethers.getContractFactory("MoneyGifts");
  const MoneyGifts = await MoneyMeGifts.deploy();

  // 컨트랙트 배포
  await MoneyGifts.deployed();
  console.log("BuyMeACoffee deployed to:", MoneyGifts.address);

  const addresses = [owner.address, tipper.address, MoneyGifts.address];
  console.log("== start ==");
  await printBalances(addresses);

  const tip = { value: hre.ethers.utils.parseEther("1") };
  await MoneyGifts.connect(tipper).GiftsMeg(
    "Carolina",
    "You're the best!",
    tip
  );
  await MoneyGifts.connect(tipper2).GiftsMeg("Vitto", "Amazing teacher", tip);
  await MoneyGifts.connect(tipper3).GiftsMeg(
    "Kay",
    "I love my Proof of Knowledge",
    tip
  );

  console.log("== money gift ==");
  await printBalances(addresses);

  await MoneyGifts.connect(owner).withdrawTips();

  console.log("== withdrawTips ==");
  await printBalances(addresses);

  console.log("== memos ==");
  const memos = await MoneyGifts.getMemos();
  printMemos(memos);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
