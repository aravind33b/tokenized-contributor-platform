// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MagnaToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply, address owner) 
        ERC20(name, symbol) 
    {
        _mint(owner, initialSupply);
    }
}
