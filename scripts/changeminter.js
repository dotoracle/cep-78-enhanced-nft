const { CasperContractClient, helpers } = require("casper-js-client-helper");
const { sleep, getDeploy } = require("./utils2");
const { createRecipientAddress } = helpers;
const keys = require('./keys')
const { CLValueBuilder, Keys, RuntimeArgs, CLByteArray , CLPublicKey} = require("casper-js-sdk");

const { DEPLOY_NODE_ADDRESS, DEPLOY_CHAIN_NAME } = require('./constants');
let NODE_ADDRESS = DEPLOY_NODE_ADDRESS
let CHAIN_NAME = DEPLOY_CHAIN_NAME
let nft_contract =
  "c21b4b9bb3842a1a4365c3b242bd99ef430d674ba5694813b78d2bcc517bd6a3";


// new minter is MPC
const hexString = "02038df1cff6b55615858b1acd2ebcce98db164f88cf88919c7b045268571cc49cb7"
const mpcPublickey = new CLPublicKey.fromHex(hexString)
console.log("new minter", mpcPublickey);

const test = async () => {
  let contractClient = new CasperContractClient(NODE_ADDRESS, CHAIN_NAME);
  let nftContractHash = new CLByteArray(Uint8Array.from(Buffer.from(nft_contract, "hex")))
  console.log('nftContractHash', nftContractHash.clType().toString())
  const runtimeArgs = RuntimeArgs.fromMap({
    dto_new_minter: createRecipientAddress(mpcPublickey) // change minter to MPC 
  });

  contractClient.contractHash = nft_contract.startsWith("hash-")
    ? nft_contract.slice(5)
    : nft_contract;

  console.log(contractClient);

  let hash = await contractClient.contractCall({
    entryPoint: "dto_change_minter",
    keys: keys.key1,
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
