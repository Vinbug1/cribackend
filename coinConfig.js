const bitcoin = require('bitcoinjs-lib');
const Web3 = require('web3');
require('dotenv').config();

const ethPrivateKey = process.env.ETHEREUM_PRIVATE_KEY;
const ethAddress = process.env.ETHEREUM_ADDRESS;
const bitPrivateKey = process.env.BITCOIN_PRIVATE_KEY;
const bitAddress = process.env.BITCOIN_ADDRESS;


// Bitcoin configuration
const bitcoinNetwork = bitcoin.networks.mainnet; // Change to bitcoin.networks.mainnet for the mainnet
const bitcoinPrivateKey = bitPrivateKey;
const bitcoinRecipientAddress = bitAddress; // Change to

// Ethereum configuration
const ethereumNetwork = 'https://mainnet.infura.io/v3/2eecfa70d4c044a38dc9fdb7e77ddd1e'; // Replace with your Infura API key
const ethereumPrivateKey = ethPrivateKey;
const ethereumRecipientAddress = ethAddress;

// Bitcoin transaction
const bitcoinTx = new bitcoin.TransactionBuilder(bitcoinNetwork);
bitcoinTx.addInput('previous_transaction_id', 0); // Replace with the actual previous transaction ID and output index
bitcoinTx.addOutput(bitcoinRecipientAddress, 9000); // Amount in satoshis
bitcoinTx.sign(0, bitcoin.ECPair.fromWIF(bitcoinPrivateKey));

// Ethereum transaction
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNetwork));
const ethereumTx = {
  from: ethAddress,
  to: ethereumRecipientAddress,
  value: web3.utils.toWei('1', 'ether'), // Amount in Ether
  gas: 21000,
  gasPrice: web3.utils.toWei('30', 'gwei'),
  nonce: await web3.eth.getTransactionCount(ethAddress),
};

const signedEthereumTx = await web3.eth.accounts.signTransaction(ethereumTx, ethereumPrivateKey);

// Broadcast transactions to the respective networks
// You need to use a service like a block explorer or your own Bitcoin/Ethereum node for this step
