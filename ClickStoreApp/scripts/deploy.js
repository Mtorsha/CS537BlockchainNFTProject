const { ethers } = require("hardhat");

async function main() {

  const [sender] = await ethers.getSigners();
  // console.log(sender);
  const ClickStore = await ethers.getContractFactory("CampaignFactory");
  // const contract = await ClickStore.deploy(0.1,sender.address,[0.1],{ value: ethers.utils.parseEther("0.1")});
  const contract = await ClickStore.deploy();
  await contract.deployed();
  console.log("Contract deployed at:", contract.address);
  console.log("Signer address used by Hardhat",sender.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
