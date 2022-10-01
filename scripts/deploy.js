const hre = require("hardhat");

async function main() {
  const MoneyMeGifts = await hre.ethers.getContractFactory("MoneyGifts");
  const MoneyGifts = await MoneyMeGifts.deploy();

  await MoneyGifts.deployed();

  console.log("MoneyGifts deployed to:", MoneyGifts.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
