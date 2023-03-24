require("dotenv").config();
const { CasperContractClient, helpers } = require("casper-js-client-helper");
const { getDeploy } = require("./indexC");
const { createRecipientAddress } = helpers;
const CEP78 = require('./Official-cep78.js')
let key = require('./keys.json').key

const { CLValueBuilder, Keys, RuntimeArgs, CLByteArrayBytesParser, CLByteArray, CLKey, CLPublicKey, CLAccountHash } = require("casper-js-sdk");

const { NODE_ADDRESS, EVENT_STREAM_ADDRESS, CHAIN_NAME, WASM_PATH } =
  process.env;

let privateKeyPem = `
-----BEGIN PRIVATE KEY-----
${key}
-----END PRIVATE KEY-----
`; // abb key
let contractHash = "36756eecbeee2800fc45e255d9d5305856760960428c25d83ee1f4b77f454fdf" // official faucet
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
  console.log("B")
  // let csp = await CEP78.createInstance(contractHash, NODE_ADDRESS, CHAIN_NAME)
    let csp = new CEP78(contractHash, NODE_ADDRESS, CHAIN_NAME);
    await csp.init();

    const meta_data_json = {
        "name": "CasperPunk",
        "symbol": "CSP",
        "token_uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/12",
        "checksum": "940bffb3f2bba35f84313aa26da09ece3ad47045c6a1292c2bbd2df4ab1a55fb",
        "stamina": 0,
        "charisma": 0,
        "intelligence": 0,
        "rarity": 0,
    }

    let account1 = "017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5" // account hash
    let account2 = "020261207299a7d59261d28a0780b92f76b5caff3ee2e3f767d7cd832e269c181767" // account hash

    console.log("A")

    try {
        let hash = await csp.mintOfficial({
            keys: KEYS,
            tokenOwner: account1,
            metadataJson: meta_data_json,
        })

        console.log(`... Contract installation deployHash: ${hash}`);

        await getDeploy(NODE_ADDRESS, hash);

        console.log(`... Contract installed successfully.`);

        let hash2 = await csp.mintOfficial({
          keys: KEYS,
          tokenOwner: account2,
          metadataJson: meta_data_json,
      })

      console.log(`... Contract installation deployHash: ${hash2}`);

      await getDeploy(NODE_ADDRESS, hash2);

      console.log(`... Contract installed successfully.`);

    } catch (e) {
        console.error(e)
    }
}

main();
