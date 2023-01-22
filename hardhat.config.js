require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("solidity-coverage");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY1 = process.env.PRIVATE_KEY;
// const COINMARKETCAP_API = process.env.COINMARKETCAP_API;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          chainId: 31337,
          blockConfirmations: 1,
      },
      // goerli: {
      //     chainId: 5,
      //     blockConfirmations: 6,
      //     url: GOERLI_RPC_URL,
      //     saveDeployments: true,
      //     accounts: [PRIVATE_KEY1],
      //     // accounts:{
      //     //     mnemonic: mnemonic
      //     // },
      // },
  },
  solidity: {
      compilers: [{ version: "0.8.17" }, { version: "0.8.7" }],
  },

  namedAccounts: {
      deployer: {
          default: 0,
          1: 0,
          5: 0,
      },
      player: {
          default: 1,
      },
  },
  // gasReporter: {
  //     enabled: true,
  //     currency: "USD",
  //     outputFile: "gas-report.txt",
  //     coinmarketcap: COINMARKETCAP_API,
  //     token: "ETH",
  //     noColors: true,
  // },
  mocha: {
      timeout: 500000, //500 max seconds
  },
  etherscan: {
      apiKey: {
          goerli: ETHERSCAN_API,
      },
  },
};
