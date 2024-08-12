// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TokenVesting is Ownable {
    IERC20 public token;
    uint256 public start;
    uint256 public duration;
    address public beneficiary;
    uint256 public released;

    constructor( IERC20 _token, address _beneficiary, uint256 _start, uint256 _duration) Ownable(_beneficiary) {
        token = _token;
        beneficiary = _beneficiary;
        start = _start;
        duration = _duration;
    }

    function release() public {
        require(block.timestamp >= start, "Vesting not started");
        uint256 unreleased = releasableAmount();
        require(unreleased > 0, "No tokens are due");

        released += unreleased;
        token.transfer(beneficiary, unreleased);
    }

    function releasableAmount() public view returns (uint256) {
        return vestedAmount() - released;
    }

    function vestedAmount() public view returns (uint256) {
        uint256 currentTime = block.timestamp;
        console.log(currentTime);
        if (currentTime >= start + duration) {
            return token.balanceOf(address(this));
        } else {
            console.log(token.balanceOf(address(this)));
            return (token.balanceOf(address(this)) * (currentTime - start)) / duration;
        }
    }

    function checkBalance() public view returns (uint256) {
        return token.balanceOf(beneficiary);
    }
}
