"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { API_URL, PRIVATE_KEY } = process.env;
const config = {
    solidity: "0.8.24",
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {},
        sepolia: {
            url: API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};
exports.default = config;
