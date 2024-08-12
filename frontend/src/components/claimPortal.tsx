import React from 'react';
import '../styles/claimPortal.css';

function ClaimPortal() {
  return (
    <div className="dashboard">
      <div className='dashHeading'>
        <h2>Dashboard</h2>
        <div className='tokenSelector'>
          <img src="token-icon.png" className='tokenIcon' />
          <span>Token A</span>
          <i className='dropdownIcon'>▼</i>
        </div>
      </div>
      <h3 className='projectName'>Project: Token For Opensource</h3>
      <div className="grid">
        <div className="card">
          <h3>Total Token Supply</h3>
          <p>100,000</p>
        </div>
        <div className="card">
          <h3>Total Tokens Allocated</h3>
          <p>200,000,000</p>
        </div>
        <div className="card">
          <h3>Total Allocations</h3>
          <p>20</p>
        </div>
        <div className="card">
          <h3>Total Stakeholders</h3>
          <p>20</p>
        </div>
      </div>
    </div>
  );
}

export default ClaimPortal;
