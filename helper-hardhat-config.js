
const networkConfig = {
    31337: {
        name: "localhost",
    },
    default: {
        name: "hardhat",
        interval: "30",
    },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains,
};
