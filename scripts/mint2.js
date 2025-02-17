import {
    DeployUtil,
    CasperClient,
    RuntimeArgs,
    CLString,
    CLPublicKey,
    CLByteArray,
    CLKey,
    CLAccountHash,
} from "casper-js-sdk";
import * as utils from "./utils.js";
import * as constants from "./constants";
import * as Utils from "./indexC";

const BigNumber = require('bignumber.js');


const main = async () => {
    //Step 1: Set casper node client
    const client = new CasperClient(constants.DEPLOY_NODE_ADDRESS);

    //Step 2: Set user key pair


    // const keyPairofUser = utils.getKeyPairOfUser(
    //     constants.PATH_TO_USER_KEYS
    // );

    // const pairKeyView = utils.getKeyPairFromPrivateFile(
    //     constants.PATH_TO_PRIVATE_KEYS

    // );

    // console.log("pairKeyView : ", pairKeyView)


    // console.log("SECPT type")

    // const pairKeyView = utils.getKeyPairFromPrivateFile(
    //     constants.PATH_TO_PRIVATE_KEYS

    // );
    const pairKeyView = utils.getKeyPairFromPrivateFile(
        constants.PATH_TO_PRIVATE_KEYS

    );
    // console.log("pubkey: ", pairKeyView.publicKey)

    // console.log("pairKeyView : ", pairKeyView)


    //cep78 contract-hash
    //const hash1 = "e6e087a685a66f884d2c3a0f6252cbe57aaf259d2c56a88041e72161bd4e8047"
    //const hash1 = "ae396053d9b477cb53319fd8f6e3b2907d5bd7ef8e8ba622df648529ecb05526"
    
    const hash1 = "39a2c626a00415332171109def12a06be37e5f109b234be355afaf86a63046f3" // CSP nft 
    //const hash1 = "68d05b72593981f73f5ce7ce5dcac9033aa0ad4e8c93b773f8b939a18c0bbc3b"
    //const hash1 = "805347b595cc24814f0d50482069a1dba24f9bfb2823c6e900386f147f25754b"  // This is Token_id ordial contract
    //const hash1 = "ed51bb0f987248a90ca15d4c8fffa85bad9b3d6c0223cbd2f2395de41f31ce6c"
    //const hash1 = "52f370db3aeaa8c094e73a3aa581c85abc775cc52605e9cd9364cae0501ce645" // This is Token_id hash contract
    //const hash1 = "9acbd5338e21b9d4251309784c09557d04de2fbe6fe49b865676027831794743" // For edit function on contract
    //const hash1 = "13270d53a99e783131add35acf4a38520ec407db3cc2cb2ca738f9bd24e861ff" // add correct minter
    const contracthashbytearray = new CLByteArray(Uint8Array.from(Buffer.from(hash1, 'hex')));
    const contracthash = new CLKey(contracthashbytearray);
    // const contracthash = hash1

    // console.log("contracthash :  ", contracthash)

    //=== token_owner: Key ===
    // const hexString =
    //     "017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5";

    //  const hexString =
    //      "020389f6a966469e202fe6ff01f1ccf5a2ffcd02b96b69fb6cde1c1d32ae4d120688";
    // const hexString = "020261207299a7d59261d28a0780b92f76b5caff3ee2e3f767d7cd832e269c181767"
    
    //const hexString = "0158cdd1af07c27a6180ade7f09389357370fe7247ab62fc4d866a03141746c68d"
    //const hexString = "017e80955a6d493a4a4b9f1b5dd23d2edcdc2c8b00fcd9689f2f735f501bd088c5" //abb account
    //const hexString = "0121eb7d280926cd62ae0b44ee628ba057e9b2696021ab0e20e40e528ae243bde1" // Vi HKA
    const hexString = "020261207299a7d59261d28a0780b92f76b5caff3ee2e3f767d7cd832e269c181767" // Ví tony
    const accounthash = new CLAccountHash(
        CLPublicKey.fromHex(hexString).toAccountHash()
    );
    // const token_owner = accounthash;
    const token_owner = new CLKey(accounthash);
    // console.log("tokenowner: ", token_owner)


    // === token_meta_data: string === 
    const meta_data_json = {
        "name": "CasperPunk",
        "symbol": "CSP",
        "token_uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/12",
        "checksum": "940bffb3f2bba35f84313aa26da09ece3ad47045c6a1292c2bbd2df4ab1a55fb",
        "stamina" : 0,
        "charisma": 0,
        "intelligence": 0,
        "rarity" : 0,
    }

    const token_meta_data = new CLString(JSON.stringify(meta_data_json))

    const dto_mint_id = new CLString("mint-id-2")

    let deploy = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
            //{data : keyPairofUser.publicKey.data , tag: keyPairofUser.publicKey.ta},
            pairKeyView.publicKey,
            // "casper-net-1",
            //"mynetwork",
            "casper-test",
            //"casper",
            constants.DEPLOY_GAS_PRICE,
            constants.DEPLOY_TTL_MS,
            //dependencies
        ),
        // new DeployUtil.DeployParams(
        //     keyPairofContract.publicKey,
        //     "casper-net-1",
        //     // "casper-test",
        //     constants.DEPLOY_GAS_PRICE,
        //     constants.DEPLOY_TTL_MS
        // ),
        DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            //utils.getBinary(constants.PATH_TO_CONTRACT_CEP78),
            Uint8Array.from(Buffer.from(hash1, 'hex')),
            "mint",
            RuntimeArgs.fromMap({
                //"nft_contract_hash": contracthash,
                "token_owner": token_owner,
                //"dto_mint_id" : dto_mint_id,
                "token_meta_data": token_meta_data
            })
        ),
        DeployUtil.standardPayment(1000000000)
        //DeployUtil.ExecutableDeployItem.newTransfer("23000000000")
    );

    deploy = client.signDeploy(deploy, pairKeyView);

    console.log("signed deloy !!!! ")

    // console.log("deploy: ", deploy)

    let deployHash = await client.putDeploy(deploy);

    console.log(`deploy hash = ${deployHash}`);

    const resultx = await Utils.getDeploy(constants.DEPLOY_NODE_ADDRESS, deployHash)

    // Query node for global state root hash
    const stateRootHash = await utils.getStateRootHash(client);
    console.log("stateRootHash :   ", stateRootHash)
};

main();

