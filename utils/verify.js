const { run } = require("hardhat");

const verify = async (ContractAddress, args) => {
    console.log("verifying.....");
    try {
        await run("verify:verify", {
            address: ContractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("already verified!");
        } else {
            console.log(error);
        }
    }
};

module.exports = { verify };
