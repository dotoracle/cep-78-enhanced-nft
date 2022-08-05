use casper_types::ApiError;

#[repr(u16)]
#[derive(Clone, Copy)]
pub enum NFTCoreError {
    InvalidAccount = 1,
    MissingInstaller = 2,
    InvalidInstaller = 3,
    UnexpectedKeyVariant = 4,
    MissingTokenOwner = 5,
    InvalidTokenOwner = 6,
    FailedToGetArgBytes = 7,
    FailedToCreateDictionary = 8,
    MissingStorageUref = 9,
    InvalidStorageUref = 10,
    MissingOwnersUref = 11,
    InvalidOwnersUref = 12,
    FailedToAccessStorageDictionary = 13,
    FailedToAccessOwnershipDictionary = 14,
    DuplicateMinted = 15,
    FailedToConvertToCLValue = 16,
    MissingCollectionName = 17,
    InvalidCollectionName = 18,
    FailedToSerializeMetaData = 19,
    MissingAccount = 20,
    MissingMintingStatus = 21,
    InvalidMintingStatus = 22,
    MissingCollectionSymbol = 23,
    InvalidCollectionSymbol = 24,
    MissingTotalTokenSupply = 25,
    InvalidTotalTokenSupply = 26,
    MissingTokenID = 27,
    InvalidTokenIdentifier = 28,
    MissingTokenOwners = 29,
    MissingAccountHash = 30,
    InvalidAccountHash = 31,
    TokenSupplyDepleted = 32,
    MissingOwnedTokensDictionary = 33,
    TokenAlreadyBelongsToMinterFatal = 34,
    FatalTokenIdDuplication = 35,
    InvalidMinter = 36,
    MissingMintingMode = 37,
    InvalidMintingMode = 38,
    MissingInstallerKey = 39,
    FailedToConvertToAccountHash = 40,
    InvalidBurner = 41,
    PreviouslyBurntToken = 42,
    MissingAllowMinting = 43,
    InvalidAllowMinting = 44,
    MissingNumberOfMintedTokens = 45,
    InvalidNumberOfMintedTokens = 46,
    MissingTokenMetaData = 47,
    InvalidTokenMetaData = 48,
    MissingApprovedAccountHash = 49,
    InvalidApprovedAccountHash = 50,
    MissingApprovedTokensDictionary = 51,
    TokenAlreadyApproved = 52,
    MissingApproveAll = 53,
    InvalidApproveAll = 54,
    MissingOperator = 55,
    InvalidOperator = 56,
    Phantom = 57,
    ContractAlreadyInitialized = 58,
    MintingIsPaused = 59,
    FailureToParseAccountHash = 60,
    VacantValueInDictionary = 61,
    MissingOwnershipMode = 62,
    InvalidOwnershipMode = 63,
    InvalidTokenMinter = 64,
    MissingOwnedTokens = 65,
    InvalidAccountKeyInDictionary = 66,
    MissingJsonSchema = 67,
    InvalidJsonSchema = 68,
    InvalidKey = 69,
    InvalidOwnedTokens = 70,
    MissingTokenURI = 71,
    InvalidTokenURI = 72,
    MissingNftKind = 73,
    InvalidNftKind = 74,
    MissingHolderMode = 75,
    InvalidHolderMode = 76,
    MissingWhitelistMode = 77,
    InvalidWhitelistMode = 78,
    MissingContractWhiteList = 79,
    InvalidContractWhitelist = 80,
    UnlistedContractHash = 81,
    InvalidContract = 82,
    EmptyContractWhitelist = 83,
    MissingReceiptName = 84,
    InvalidReceiptName = 85,
    InvalidJsonMetadata = 86,
    InvalidJsonFormat = 87,
    FailedToParseCep99Metadata = 88,
    FailedToParse721Metadata = 89,
    FailedToParseCustomMetadata = 90,
    InvalidCEP99Metadata = 91,
    FailedToJsonifyCEP99Metadata = 92,
    InvalidNFT721Metadata = 93,
    FailedToJsonifyNFT721Metadata = 94,
    InvalidCustomMetadata = 95,
    MissingNFTMetadataKind = 96,
    InvalidNFTMetadataKind = 97,
    MissingIdentifierMode = 98,
    InvalidIdentifierMode = 99,
    FailedToParseTokenId = 100,
    MissingMetadataMutability = 101,
    InvalidMetadataMutability = 102,
    FailedToJsonifyCustomMetadata = 103,
    ForbiddenMetadataUpdate = 104,
    MissingDtoMintFee = 501,
    InvalidDtoMintFee = 502,
    MissingDtoOriginChainID = 503,
    InvalidDtoOriginChainID = 504,
    MissingDtoOriginContractAddress = 505,
    InvalidDtoOriginContractAddress = 506,
    MissingDtoDev = 507,
    InvalidDtoDev = 508,
    MissingDtoMinter = 509,
    InvalidDtoMinter = 510,
}

impl From<NFTCoreError> for ApiError {
    fn from(e: NFTCoreError) -> Self {
        ApiError::User(e as u16)
    }
}
