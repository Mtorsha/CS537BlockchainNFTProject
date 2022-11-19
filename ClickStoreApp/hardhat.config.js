require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
// const GOERLI_PRIVATE_KEY = "net rally inmate gas finish boy balcony tree ceiling lucky cattle bird";

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/241b71ed4056416897c09aa01124371f",
      accounts: ["d369739d06470f6c90be0a4dac9bce457697a28a589e500490ed3d952b3b49da"]
    }
  }
};
