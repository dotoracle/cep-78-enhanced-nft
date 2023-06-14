extern crate alloc;

use alloc::{string::String, vec::Vec};

use casper_types::{Key, U256};
use casper_types_derive::{CLTyped, FromBytes, ToBytes};
use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Clone, CLTyped, ToBytes, FromBytes)]
pub(crate) struct ApproveMint {
    pub token_ids: Vec<String>,
    pub token_metadatas: Vec<String>,
    pub mint_id: String,
}

#[derive(Serialize, Deserialize, Clone, CLTyped, ToBytes, FromBytes)]
pub(crate) struct RequestBridgeBackData {
    pub token_ids: Vec<String>,
    pub to_chainid: U256,
    pub from: Key,
    pub to: String,
}
