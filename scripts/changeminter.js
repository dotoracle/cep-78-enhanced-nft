const { CasperContractClient, helpers } = require("casper-js-client-helper");
const { sleep, getDeploy } = require("./utils2");
const { createRecipientAddress } = helpers;
const keys = require('./keys')
const { CLValueBuilder, Keys, RuntimeArgs, CLByteArray } = require("casper-js-sdk");

const {DEPLOY_NODE_ADDRESS, DEPLOY_CHAIN_NAME } = require('./constants');
let NODE_ADDRESS = DEPLOY_NODE_ADDRESS
let CHAIN_NAME = DEPLOY_CHAIN_NAME
let nft_contract =
  "f0268da5a91a74ad0d3e92a7d96bbfd35593b0d42dbae6bad3387ff6fa58cf85";

console.log("new minter", keys.key2.accountHex());

const test = async () => {
  let contractClient = new CasperContractClient(NODE_ADDRESS, CHAIN_NAME);
  let nftContractHash = new CLByteArray(Uint8Array.from(Buffer.from(nft_contract, "hex")))
  console.log('nftContractHash', nftContractHash.clType().toString())
  const runtimeArgs = RuntimeArgs.fromMap({
    dto_new_minter: createRecipientAddress(keys.key1.publicKey)
  });

  contractClient.contractHash = nft_contract.startsWith("hash-")
    ? nft_contract.slice(5)
    : nft_contract;

  console.log(contractClient);

  let hash = await contractClient.contractCall({
    entryPoint: "dto_change_minter",
    keys: keys.key2,
    paymentAmount: "1000000000",
    runtimeArgs,
    cb: (deployHash) => {
      console.log("deployHash", deployHash);
    },
    ttl: 900000,
  });

  console.log(`... Contract installation deployHash: ${hash}`);

  await getDeploy(NODE_ADDRESS, hash);

  console.log(`... Contract installed successfully.`);
};

test();
