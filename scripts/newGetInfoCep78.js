require("dotenv").config();
const { CasperContractClient, helpers } = require("casper-js-client-helper");
const { getDeploy } = require("./indexC");
const { createRecipientAddress } = helpers;
const CEP78 = require('./Official-cep78.js')
let key = require('./keys.json').key
const sha256 = require("js-sha256")

const { CLValueBuilder, Keys, RuntimeArgs, CLByteArrayBytesParser, CLByteArray, CLKey, CLPublicKey, CLAccountHash } = require("casper-js-sdk");

const { NODE_ADDRESS, EVENT_STREAM_ADDRESS, CHAIN_NAME, WASM_PATH } =
  process.env;

let privateKeyPem = `
-----BEGIN PRIVATE KEY-----
${key}
-----END PRIVATE KEY-----
`; // abb key
let contractHash = "aeb9f1877ce978c73fa099c82c9ebd65af183a922c3f6588675dd5e640ea03a8" // wrap 721
//let contractHash = "97ec1fdd4281b3ea73039f749fc784d80c3a7c562eba5a6a9adca223e3b5aca2"
let toAddress = "020261207299a7d59261d28a0780b92f76b5caff3ee2e3f767d7cd832e269c181767" // publicKey


let privateKeyBuffer = Keys.Ed25519.parsePrivateKey(
  Keys.Ed25519.readBase64WithPEM(privateKeyPem)
);
let publicKey = Keys.Ed25519.privateToPublicKey(
  Uint8Array.from(privateKeyBuffer)
);
let KEYS = new Keys.Ed25519.parseKeyPair(
  publicKey,
  Uint8Array.from(privateKeyBuffer)
);

async function main() {
  console.log("B", NODE_ADDRESS, CHAIN_NAME)
  let csp = await CEP78.createInstance(contractHash, NODE_ADDRESS, CHAIN_NAME)
  // let csp = new CEP78(contractHash, NODE_ADDRESS, CHAIN_NAME);
  // await csp.init();

  console.log("sha : ", sha256("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/10"))
  const meta_data_json = {
    "name": "DTO OFFICIAL",
    "symbol": "DTO",
    "token_uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/10",
    "checksum": sha256("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/10")
    // "stamina": 0,
    // "charisma": 0,
    // "intelligence": 0,
    // "rarity": 0,
  }

  let account2 = "020261207299a7d59261d28a0780b92f76b5caff3ee2e3f767d7cd832e269c181767" // account hash

  console.log("A")

  try {

    let bal = await csp.balanceOf(CLPublicKey.fromHex("0202f92c9b79232db38584ad558cf5becf5bfd23987e4e1d36d49166289ed8208f5f"))
    // console.log("token owned", metadata.map((e) => parseInt(e)));
    console.log("bal: ", parseInt(bal))

    let allTokens = await csp.getOwnedTokenIdsHash(CLPublicKey.fromHex("0202f92c9b79232db38584ad558cf5becf5bfd23987e4e1d36d49166289ed8208f5f"))
    console.log(allTokens)

    // let list = await csp.userMintIdList(CLPublicKey.fromHex("017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5"))
    // console.log(list.toString())


  } catch (e) {
    console.error(e)
  }
}

main();
