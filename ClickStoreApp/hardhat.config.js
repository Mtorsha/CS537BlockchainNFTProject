require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
// const GOERLI_PRIVATE_KEY = "net rally inmate gas finish boy balcony tree ceiling lucky cattle bird";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/SdnvCcfm3EFbeI7Na3hYhKgxu7tPSWed`,
      accounts: ["d369739d06470f6c90be0a4dac9bce457697a28a589e500490ed3d952b3b49da","ddca0f0f83340aaf6a4cd968800b9cc9874c3f89db63c7536af2f6f163c92276"]
    }
  }
};
