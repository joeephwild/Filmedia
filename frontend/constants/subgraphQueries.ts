import { gql } from "@apollo/client";

const GET_LISTED_NFTS = gql`
  {
    listedMusicNFTs(first: 5) {
      id
      artist
      chainid
      tokenId
    }
  }
`;
export default GET_LISTED_NFTS;
