import { NFTStorage, File } from 'nft.storage';

const apiKey = process.env.EXPO_PUBLIC_NFTSTORAGE_API_KEY;

if (!apiKey) {
  throw new Error("API key for NFTStorage is undefined");
}

const client = new NFTStorage({ token: apiKey });

export const uploadToNFTStorage = async (file: File) => {
  const cid = await client.storeBlob(file);
  return `https://ipfs.io/ipfs/${cid}`;
};
