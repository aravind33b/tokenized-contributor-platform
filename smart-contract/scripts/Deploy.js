"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    // Deploy MagnaToken contract
    const MagnaToken = await hardhat_1.ethers.getContractFactory("MagnaToken");
    const initialSupply = hardhat_1.ethers.parseEther("1000000");
    const magnaToken = await MagnaToken.deploy(initialSupply);
    await magnaToken.waitForDeployment();
    console.log("MagnaToken deployed to:", magnaToken.target);
    // Set up vesting parameters
    const startTime = Math.floor(Date.now() / 1000) + 60; // Start after 1 min
    const duration = 1800; // 30 mins
    const beneficiary = "0x5Ca68291348809Be5E6c552930FC483adB2f27Ee";
    // Deploy TokenVesting contract
    const TokenVesting = await hardhat_1.ethers.getContractFactory("TokenVesting");
    const tokenVesting = await TokenVesting.deploy(magnaToken.target, beneficiary, startTime, duration);
    await tokenVesting.waitForDeployment();
    console.log("TokenVesting deployed to:", tokenVesting.target);
    // Transfer tokens to the vesting contract
    const transferTx = await magnaToken.transfer(tokenVesting.target, hardhat_1.ethers.parseEther("10000"));
    await transferTx.wait();
    console.log("Transferred tokens to TokenVesting contract");
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
