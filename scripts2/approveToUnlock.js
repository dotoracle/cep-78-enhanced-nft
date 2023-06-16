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
  console.log("test wrapped nft")
  const nftContractHash = await CWeb3.Contract.getActiveContractHash(nftPackageHash, CHAIN_NAME)
  const contract = await CWeb3.Contract.createInstanceWithRemoteABI(nftContractHash, NODE_ADDRESS, CHAIN_NAME)
  const metadata = JSON.stringify({
    name: "John Doe",
    token_uri: "https://www.barfoo.com",
    checksum: "940bffb3f2bba35f84313aa26da09ece3ad47045c6a1292c2bbd2df4ab1a55fb"
  })
  const hash = await contract.contractCalls.approveToClaim.makeDeployAndSend({
    keys: KEYS,
    args: {
      mintId: `0x7788d03de297137446ae4d66a5630d40064e8ec398305c7189f717e4b41914e5-43113-96945816564243-94-${"0xEC83b9Dd29D22D53870AFC9223689294dC2153d1".toLowerCase()}-43113`,
      tokenOwner: KEYS.publicKey,
      tokenMetaDatas: configed.tokenIds.map(e => metadata),
      tokenIds: configed.tokenIds,
    },
    paymentAmount: '10000000000'
  })

  console.log(`... Contract installation deployHash: ${hash}`);

  await getDeploy(NODE_ADDRESS, hash);

  console.log(`... Contract installed successfully.`);
};

test();
