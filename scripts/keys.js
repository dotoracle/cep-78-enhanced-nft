const {
    CLValueBuilder,
    Keys,
    CLPublicKey,
    CLPublicKeyType,
    RuntimeArgs,
    CLAccountHash
  } = require('casper-js-sdk')
let privateKeyPem = `
-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIBaIAmHLDktY+ktgM/rATb981fzv++FIA6pif+D2DRi6
-----END PRIVATE KEY-----
`

let keyPem2 = `
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIHfi6JZ7JfmoobQXzE1AwnBNmBu5TOxWcamOjqx45+RWoAcGBSuBBAAK
oUQDQgAE2eUcCqa6+CkDEo2N4S8c04bJRIuPHJcE6D8XUFdySp3MbHenkLBw2LcM
re8Bn/kAxqttvC/wvyrQy2Z74jjiaQ==
-----END EC PRIVATE KEY-----
`

let privateKeyBuffer = Keys.Ed25519.parsePrivateKey(Keys.Ed25519.readBase64WithPEM(privateKeyPem))
let publicKey = Keys.Ed25519.privateToPublicKey(Uint8Array.from(privateKeyBuffer))
let privateKey2Buffer = Keys.Secp256K1.parsePrivateKey(Keys.Secp256K1.readBase64WithPEM(keyPem2))
console.log(privateKey2Buffer.length)
let publicKey2 = Keys.Secp256K1.privateToPublicKey(Uint8Array.from(privateKey2Buffer))
module.exports = {
  key1: new Keys.Ed25519.parseKeyPair(publicKey, Uint8Array.from(privateKeyBuffer)),
  key2: new Keys.Secp256K1.parseKeyPair(publicKey2, Uint8Array.from(privateKey2Buffer), 'raw')
}