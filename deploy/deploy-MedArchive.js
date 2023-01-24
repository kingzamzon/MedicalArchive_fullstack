const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { ethers, network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    const { log, deploy } = deployments;
    console.log(`Using chain id ${chainId}`);

    const args = [];
    log(
        "___________________________________________________________________________________________"
    );

    console.log("deploying.....");
    const MedArchive = await deploy("MedArchive", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log(
        "___________________________________________________________________________________________"
    );

    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPI) {
        console.log("Verifying .....");
        await verify(MedArchive.address, args);
    }

    log(
        "___________________________________________________________________________________________"
    );
};

module.exports.tags = ["all", "MedArchive"];
