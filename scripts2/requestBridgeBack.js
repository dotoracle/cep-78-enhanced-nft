require("dotenv").config();
const { getDeploy } = require("./utils");
let key = require('./keys.json').key
const CWeb3 = require('casper-web3')

const { Keys } = require("casper-js-sdk");

const { NODE_ADDRESS, CHAIN_NAME } =
  process.env;
const configed = require("./config.json")


let nftPackageHash = configed.nftPackageHash
let privateKeyBuffer = Keys.Secp256K1.parsePrivateKey(Uint8Array.from(Buffer.from(key, 'hex')), 'raw')
let publicKey = Keys.Secp256K1.privateToPublicKey(Uint8Array.from(privateKeyBuffer))
let KEYS = new Keys.Secp256K1.parseKeyPair(publicKey, Uint8Array.from(privateKeyBuffer), 'raw')

const test = async () => {
  const nftContractHash = await CWeb3.Contract.getActiveContractHash(nftPackageHash, CHAIN_NAME)
  const contract = await CWeb3.Contract.createInstanceWithRemoteABI(nftContractHash, NODE_ADDRESS, CHAIN_NAME)
  const hash = await contract.contractCalls.requestBridgeBack.makeDeployAndSend({
      keys: KEYS,
      args: {
        tokenIds: [18, 19],
        toChainid: 43113,
        receiverAddress: "0xEC83b9Dd29D22D53870AFC9223689294dC2153d1"
      },
      paymentAmount: '10000000000'
  })

  console.log(`... Contract installation deployHash: ${hash}`);

  await getDeploy(NODE_ADDRESS, hash);

  console.log(`... Contract installed successfully.`);
};

test();
