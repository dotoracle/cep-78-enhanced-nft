require("dotenv").config();
const { CLAccountHash, CLPublicKey, U64_ID, U256_ID } = require("casper-js-sdk");
let CEP78 = require("./CSP-cep78");
let contractHash =
  "f453e60914474a7de3f581ebb438ce16dd88b6519481c034b96fac9f3260866b";  // new cep78

const { NODE_ADDRESS, EVENT_STREAM_ADDRESS, CHAIN_NAME, WASM_PATH } =
  process.env;
async function main() {
  let contract = new CEP78(contractHash, NODE_ADDRESS, CHAIN_NAME);
  await contract.init();
  // let identifier_mode = await contract.identifierMode();
  // console.log("identifier_mode", identifier_mode.toString());

  //   let ownerOf = await cep78.getOwnerOf(31);
  //   console.log("ownerOf", ownerOf);

  //   let balanceOf = await cep78.balanceOf("3bdcc50ce1e1e0119d4901b686c65c66b63cc17e5fa5da2299e332c545ec23c6")
  //   console.log('balanceOf', balanceOf.toString())

  //   let burntTokens = await cep78.burntTokens(31);
  //   console.log("burntTokens", burntTokens);

  //   let metadata = await cep78.getTokenMetadata(31);
  //   console.log("metadata", metadata);

  //   let operator = await cep78.getOperator(31);
  //   console.log("operator", operator);

  try {
    let metadata = await contract.getOwnedTokens(CLPublicKey.fromHex("017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5")) // abb account
    let meta1 = await contract.getTokenMetadata(1)
    // let meta2 = await contract.getTokenMetadata(2)

    //let metadata = await contract.getOwnedTokens(CLPublicKey.fromHex("0121eb7d280926cd62ae0b44ee628ba057e9b2696021ab0e20e40e528ae243bde1"))// Vi hka
    let bal = await contract.balanceOf(CLPublicKey.fromHex("017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5"))
    console.log("token owned", metadata.map((e) => parseInt(e)));
    console.log("bal: ", parseInt(bal))
    console.log("meta1: ", meta1)
    console.log("meta2: ", meta2)
  } catch (e) {
    console.error(e)
  }
}

main();
