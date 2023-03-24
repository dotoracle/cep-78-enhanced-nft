require("dotenv").config();
const { CasperContractClient, helpers } = require("casper-js-client-helper");
const { getDeploy } = require("./indexC");
const { createRecipientAddress } = helpers;
const CEP78 = require('./CSP-cep78')
let key = require('./keys.json').key

const { CLValueBuilder, Keys, RuntimeArgs, CLByteArrayBytesParser, CLByteArray, CLKey, CLPublicKey, CLAccountHash } = require("casper-js-sdk");

const { NODE_ADDRESS, EVENT_STREAM_ADDRESS, CHAIN_NAME, WASM_PATH } =
  process.env;

let privateKeyPem = `
-----BEGIN PRIVATE KEY-----
${key}
-----END PRIVATE KEY-----
`; // abb key
let contractHash = "46951af1b2ccc7b73ea3747c4c45e5a47579dc1a6146d32dd04071475af2ef5c" // bridge faucet
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
    let csp = new CEP78(contractHash, NODE_ADDRESS, CHAIN_NAME);
    await csp.init();

    const meta_data_json = {
        "name": "CasperPunk",
        "symbol": "CSP",
        "token_uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/12",
        "checksum": "940bffb3f2bba35f84313aa26da09ece3ad47045c6a1292c2bbd2df4ab1a55fb",
    }

    let accounthash = "account-hash-55884917f4107a59e8c06557baee7fdada631af6d1c105984d196a84562854eb" // account hash

    try {
        let hash = await csp.mint({
            keys: KEYS,
            tokenOwner: accounthash,
            metadataJson: meta_data_json,
        })

        console.log(`... Contract installation deployHash: ${hash}`);

        await getDeploy(NODE_ADDRESS, hash);

        console.log(`... Contract installed successfully.`);
    } catch (e) {
        console.error(e)
    }
}

main();
