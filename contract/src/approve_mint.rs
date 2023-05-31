extern crate alloc;

use alloc::{string::String, vec::Vec};

use serde::{Deserialize, Serialize};
use casper_types_derive::{CLTyped, FromBytes, ToBytes};
#[derive(Serialize, Deserialize, Clone, CLTyped, ToBytes, FromBytes)]
pub(crate) struct ApproveMint {
    pub token_ids: Vec<String>,
    pub token_metadatas: Vec<String>,
    pub mint_id: String
}

#[derive(Serialize, Deserialize, Clone, CLTyped, ToBytes, FromBytes)]
pub(crate) struct RequestBridgeBackData {
    pub token_ids: Vec<String>
}

