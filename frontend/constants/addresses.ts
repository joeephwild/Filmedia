import { ApolloClient, InMemoryCache } from "@apollo/client";

export const PROVIDER = "https://replicator-01.pegasus.lightlink.io/rpc/v1";
export const artistNFTAddress = "0xE24962CA495b179056A465188Cac88E6572bA99a";
export const filMediaMarketplaceAddress =
  "0xA9834D0BCe54b38F6d2bC58dB4916234718406D7";
export const dynamicNftAddress = "0xf6eC93087E6C236665ECb28f27eDC3bF31DD4f37";
export const userNFTAddress = "0x2F17366446b0509128CB6518D326C3707B80c2f0";
export const artistFTAddress = "0xfb2f1068645105bbd4bff57723a5f6b3bf417a6f";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
    "https://api.studio.thegraph.com/query/42226/filmedia3/0.0.1",
});
