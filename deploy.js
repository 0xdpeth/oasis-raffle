const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const fs = require('fs');
const config = require('dotenv').config()
const mnemonic = fs.readFileSync('.secret').toString().trim();

const provider = new HDWalletProvider(
  mnemonic,
  config.parsed.TESTNET_NETWORK_RPC  // infura endpoint
);

const web3 = new Web3(provider);
console.log(interface)
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
