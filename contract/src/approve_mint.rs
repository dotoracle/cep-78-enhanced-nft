extern crate alloc;

use alloc::{string::String, vec::Vec};
use casper_types::{
    bytesrepr,
    bytesrepr::{FromBytes, ToBytes},
    CLType, CLTyped,
};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct ApproveMint {
    pub token_ids: Vec<String>,
    pub token_metadatas: Vec<String>,
}
impl ToBytes for ApproveMint {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        let mut result = bytesrepr::allocate_buffer(self)?;
        result.extend(self.token_ids.to_bytes()?);
        result.extend(self.token_metadatas.to_bytes()?);
        Ok(result)
    }

    fn serialized_length(&self) -> usize {
        self.token_ids.serialized_length() + self.token_metadatas.serialized_length()
    }
}

impl FromBytes for ApproveMint {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (token_ids, remainder) = Vec::<String>::from_bytes(bytes)?;
        let (token_metadatas, remainder) = Vec::<String>::from_bytes(remainder)?;

        let ret = ApproveMint {
            token_ids,
            token_metadatas,
        };
        Ok((ret, remainder))
    }
}

impl CLTyped for ApproveMint {
    fn cl_type() -> CLType {
        CLType::Any
    }
}
