require('dotenv').config()
const fs = require('fs');
const {
  Keys,
  RuntimeArgs,
  CLString,
  CLU64,
  CLU8,
  CLBool,
} = require("casper-js-sdk");
const {
  utils,
  helpers,
} = require("casper-js-client-helper");
const { installContract, createRecipientAddress } = helpers;
const { getDeploy } = require('./utils')
let key = require('./keys.json').key
let NFTInfo = require('./NFTInfo.json')
const {
  NODE_ADDRESS,
  CHAIN_NAME,
  WASM_PATH
} = process.env
let paymentAmount = '370000000000' //270

let privateKeyBuffer = Keys.Secp256K1.parsePrivateKey(Uint8Array.from(Buffer.from(key, 'hex')), 'raw')
let publicKey = Keys.Secp256K1.privateToPublicKey(Uint8Array.from(privateKeyBuffer))
let KEYS = new Keys.Secp256K1.parseKeyPair(publicKey, Uint8Array.from(privateKeyBuffer), 'raw')
console.log('pubkey', KEYS.accountHex())

const main = async () => {

  //   --session-arg "collection_name:string=''" \
  const collection_name = new CLString(NFTInfo.collectionName);
  // --session-arg "collection_symbol:string=''" \
  const collection_symbol = new CLString(NFTInfo.collectionSymbol);
  // --session-arg "total_token_supply:u64='10'" \
  const total_token_supply = new CLU64(NFTInfo.totalSupply);
  // --------------------
  // |    Mode      | u8 |
  // --------------------
  // | Minter       | 0  |
  // --------------------
  // | Assigned     | 1  |
  // --------------------
  // | Transferable | 2  |
  // --------------------
  //
  // --session-arg "ownership_mode:u8='2'" \
  //
  const ownership_mode = new CLU8("2");
  //
  // --------------------
  // |   NFTKind   | u8 |
  // --------------------
  // | Physical    | 0  |
  // --------------------
  // | Digital     | 1  |
  // --------------------
  // | Virtual     | 2  |
  // --------------------
  //
  // --session-arg "nft_kind:u8='1'" \
  //
  const nft_kind = new CLU8(1);
  //
  // --------------------
  // | NFTHolderMode | u8 |
  // --------------------
  // | Accounts      | 0  |
  // --------------------
  // | Contracts     | 1  |
  // --------------------
  // | Mixed         | 2  |
  // --------------------
  //
  // --session-arg "holder_mode:opt_u8='2'" \
  const holder_mode = new CLU8(2);
  //const holder_mode = new CLU8(2);


  // --session-arg "holder_mode:opt_u8='2'" \
  const events_mode = new CLU8(2) //new CLOption(Some(new CLU8(1)));
  //const holder_mode = new CLU8(2);


  // owner_reverse_lookup_mode

  const owner_reverse_lookup_mode = new CLU8(1) //new CLOption(Some(new CLU8(1)));


  //
  // --------------------
  // | MintingMode | u8 |
  // --------------------
  // | Installer   | 0  |
  // --------------------
  // | Public      | 1  |
  // --------------------
  //
  const minting_mode = new CLU8(1);

  // Optional
  //
  // --session-arg "json_schema:string='nft-schema'" \
  const json_schema = new CLString("nft-schema");
  //
  // allows minting when true
  //
  // --session-arg "allow_minting:bool='true'" \
  //
  const allow_minting = new CLBool(true);
  //
  // --------------------------
  // | NFTMetadataKind  | u8 |
  // -------------------------
  // | CEP78            | 0  |
  // -------------------------
  // | NFT721           | 1  |
  // -------------------------
  // | Raw              | 2  |
  // -------------------------
  // | CustomValidated  | 3  |
  // --------------------------
  // | CasperPunk       | 4  |
  // --------------------------
  //
  // == CEP-78 metadata example
  // {
  // "name": "John Doe",
  // "token_uri": "https://www.barfoo.com",
  // "checksum": "940bffb3f2bba35f84313aa26da09ece3ad47045c6a1292c2bbd2df4ab1a55fb"
  // }
  // ==
  // --session-arg "nft_metadata_kind:u8='1'" \
  //
  const nft_metadata_kind = new CLU8(0);
  //
  // --------------------------
  // | NFTIdentifierMode  | u8 |
  // ---------------------------
  // | Ordinal            | 0  |
  // ---------------------------
  // | Hash               | 1  |
  // ---------------------------
  //
  // --session-arg "identifier_mode:u8='0'" \
  const identifier_mode = new CLU8(0);
  //
  // --------------------------
  // | MetadataMutability | u8 |
  // ---------------------------
  // | Immutable          | 0  |
  // ---------------------------
  // | Mutable            | 1  |
  // ---------------------------
  //
  // --session-arg "metadata_mutability:u8='0'"
  const metadata_mutability = new CLU8(0); // CAN CHANGE METADATA

  const csp_dev = createRecipientAddress(KEYS.publicKey) 
  const csp_minter = createRecipientAddress(KEYS.publicKey) 

  const runtimeArgs = RuntimeArgs.fromMap({
    the_contract_owner: csp_dev,
    collection_name: collection_name,
    collection_symbol: collection_symbol,
    total_token_supply: total_token_supply,
    ownership_mode: ownership_mode,
    nft_kind: nft_kind,
    minting_mode: minting_mode,
    holder_mode,
    json_schema,
    allow_minting,
    nft_metadata_kind,
    identifier_mode,
    metadata_mutability,
    owner_reverse_lookup_mode,
    events_mode: events_mode,
    minter: csp_minter,
    contract_owner: csp_dev
  })
  console.log("DDDDD")
  let hash = await installContract(
    CHAIN_NAME,
    NODE_ADDRESS,
    KEYS,
    runtimeArgs,
    paymentAmount,
    WASM_PATH
  );
  console.log("B")

  console.log(`... Contract installation deployHash: ${hash}`)

  await getDeploy(NODE_ADDRESS, hash)

  let accountInfo = await utils.getAccountInfo(NODE_ADDRESS, KEYS.publicKey)

  console.log(`... Contract installed successfully.`)

  console.log(`... Account Info: `)
  console.log(JSON.stringify(accountInfo, null, 2))
  fs.writeFileSync('scripts/contractinfo.json', JSON.stringify(accountInfo, null, 2));


};

main();