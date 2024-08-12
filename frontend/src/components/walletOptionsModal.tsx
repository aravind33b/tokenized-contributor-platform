import React from 'react';
import Modal from 'react-modal';
import { WalletOptions } from './wallet-options';
import '../styles/walletOptionsModal.css';

Modal.setAppElement('#root');

function WalletOptionsModal({ isOpen, onRequestClose }: { isOpen: boolean; onRequestClose: () => void; }) {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="modalContent" 
      overlayClassName="modalOverlay"
    >
      <button onClick={onRequestClose} className="closeButton">&times;</button>
      <h2 id='modalHeading'>Select a Wallet</h2>
      <span className="modalOptions"><WalletOptions /></span>
    </Modal>
  );
}

export default WalletOptionsModal;
