 export const Profilequery = `
    query MyQuery($identity: String!) {
      Socials(
        input: {
          filter: {
            dappName: { _eq: "lens" }
            identity: { _eq: $identity }
          }
          blockchain: ethereum
        }
      ) {
        Social {
          id
          chainId
          blockchain
          dappName
          dappSlug
          dappVersion
          userId
          userAddress
          userCreatedAtBlockTimestamp
          userCreatedAtBlockNumber
          userLastUpdatedAtBlockTimestamp
          userLastUpdatedAtBlockNumber
          userHomeURL
          userRecoveryAddress
          userAssociatedAddresses
          profileName
          profileTokenId
          profileTokenAddress
          profileCreatedAtBlockTimestamp
          profileCreatedAtBlockNumber
          profileLastUpdatedAtBlockTimestamp
          profileLastUpdatedAtBlockNumber
          profileTokenUri
          isDefault
          identity
          handleTokenAddress
          handleTokenId
          metadataURI
          profileMetadata
          coverImageURI
          twitterUserName
          website
          location
          profileHandle
          profileHandleNft {
            address
          }
          coverImageContentValue {
            image {
              small
            }
          }
          profileImageContentValue {
            image {
              small
            }
          }
        }
      }
    }
  `;

  export const TrendingQuery = `
  query MyQuery(
    $startTime: Time,
    $endTime: Time,
    $tokenType: [TokenType!],
    $chain: TokenBlockchain!,
    $limit: Int
  ) {
    TokenTransfers(
      input: {
        filter: {
          from: {_eq: "0x0000000000000000000000000000000000000000"},
          blockTimestamp: {_gte: $startTime, _lte: $endTime},
          tokenType: {_in: $tokenType},
        }
        blockchain: $chain,
        order: {blockTimestamp: DESC},
        limit: $limit
      }
    ) {
      TokenTransfer {
        tokenAddress
        operator {
          addresses
        }
        to {
          addresses
        }
        token {
          name
          projectDetails {
            imageUrl
            collectionName
            description
          }
        }
      }
    }
  }
  `;