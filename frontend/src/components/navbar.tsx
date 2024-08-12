import React, { useState, useEffect } from 'react';
import { WagmiProvider, useAccount, useDisconnect } from 'wagmi';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import WalletOptionsModal from './walletOptionsModal';
import '../styles/navbar.css';

function Navbar() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [balance, setBalance] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        const provider = new Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance.toString()));
      }
    };

    if (isConnected) {
      fetchBalance();
    }
  }, [address, isConnected]);

  const handleModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <nav className='navbar'>
      <h1 className='logo'>My DApp</h1>
      {isConnected ? (
        <>
          <button className='button' onClick={() => disconnect()}>Disconnect</button>
          <div>
            <p>Wallet Address: {address}</p>
            <p>Balance: {balance ? `${balance} ETH` : 'Fetching balance...'}</p>
          </div>
        </>
      ) : (
        <button className='button' onClick={handleModal}>Connect Wallet</button>
      )}
      <WalletOptionsModal isOpen={modalIsOpen} onRequestClose={handleModal} />
    </nav>
  );
}

export default Navbar;
