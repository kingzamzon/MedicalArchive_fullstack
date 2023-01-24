const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { expect, assert } = require("chai");

!developmentChains.includes(network.name)
    ? decribe.skip
    : describe("MedArchive Unit_Test", () => {
          let MedArchive, chainId, deployer;
          chainId = network.config.chainId;

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer;
              await deployments.fixture(["all"]);
              MedArchive = await ethers.getContract("MedArchive", deployer);
          });

          describe("constructor", () => {
              it("add the correct owner address", async () => {
                  const owner = await MedArchive.s_owner();
                  assert.equal(owner, deployer);
              });
          });

          describe("add Patint ", () => {
              it("should emit correct user id", async () => {
                  const tx = await MedArchive.addPatient("Ada");

                  let receipt = await tx.wait(1);
                  // console.log(receipt)
                  let { hospitalAddress, id } = receipt.events[0].args;
                  assert.equal(id.toString(), 1);
              });
          });
      });
