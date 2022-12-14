//
// hre.waffle.provider.getBalance ๐ ์ง๊ฐ ๊ณ์  ์์ก์ ์ฝ๊ธฐ
// hre.ethers.getContractFactory ๐ ์ปจํธ๋ํธ ๋ฐฐํฌํ๊ธฐ
// hre.ethers.utils.parseEther ๐ Ether ๋จ์ ํ์ํํ  ์ ์๋ ๊ธฐ๋ฅ

const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// ์๊ณ  ์ถ๋ ฅ
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

// ์ปจํธ๋ํธ ๊ตฌ์กฐ์ฒด ์ถ๋ ฅ
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
  // ๊ตฌ์กฐ์ฒด ์์๋๋ก
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // ์ปจํธ๋ํธ ๋ฐฐํฌ
  const MoneyMeGifts = await hre.ethers.getContractFactory("MoneyGifts");
  const MoneyGifts = await MoneyMeGifts.deploy();

  // ์ปจํธ๋ํธ ๋ฐฐํฌ
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
