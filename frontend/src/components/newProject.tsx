import React, { useState } from 'react';
import '../styles/newProject.css';
import { ethers } from 'ethers';
import MagnaTokenABI from '../contract-abi/MagnaToken.json';
import TokenVestingABI from '../contract-abi/TokenVesting.json';

function NewProject() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [duration, setDuration] = useState('');

  const handleDeploy = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const ownerAddress = "0x2177eC6d39dedd85178D36c0470BbA18Cd04106F";
    const supply = ethers.parseUnits(initialSupply, 18);

    // Deploy the Token Contract
    const TokenFactory = new ethers.ContractFactory(
        MagnaTokenABI.abi,
        MagnaTokenABI.bytecode,
        signer
      );

    const token = await TokenFactory.deploy(tokenName, tokenSymbol, supply, ownerAddress);
    await token.waitForDeployment();

    const tokenAddress = token.getAddress();
    console.log('Token contract deployed to:', tokenAddress);

    // Deploy the Vesting Contract
    const beneficiary = await signer.getAddress(); // Beneficiary is the connected wallet
    const start = Math.floor(Date.now() / 1000) + 60; // Start 1 minute from now
    const vestingFactory = new ethers.ContractFactory(
      TokenVestingABI.abi,
      TokenVestingABI.bytecode,
      signer
    );

    const vesting = await vestingFactory.deploy(tokenAddress, beneficiary, start, duration);
    await vesting.waitForDeployment();

    console.log('Vesting contract deployed to:', vesting.getAddress());

    // Transfer tokens to the vesting contract
    const transferTx = await token.transfer(vesting.target, ethers.parseUnits("10000", 18));
    await transferTx.wait();
    console.log("Transferred tokens to TokenVesting contract");
  };

  return (
    <div className="new-project">
      <h2>New Project</h2>
      <form className="project-form" onSubmit={(e) => e.preventDefault()}>
        <h3>Token Name:</h3>
        <input type="text" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />
        <h3>Token Symbol:</h3>
        <input type="text" value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} />
        <h3>Supply:</h3>
        <input type="text" value={initialSupply} onChange={(e) => setInitialSupply(e.target.value)} />
        <h3>Vesting Duration (seconds):</h3>
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </form>
      <button className="deploy-button" onClick={handleDeploy}>Deploy Contract</button>
    </div>
  );
}

export default NewProject;
