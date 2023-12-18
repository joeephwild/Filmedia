// import { NFTStorage, File } from 'nft.storage';

// const apiKey = process.env.EXPO_PUBLIC_NFTSTORAGE_API_KEY;

// if (!apiKey) {
//   throw new Error("API key for NFTStorage is undefined");
// }

// const client = new NFTStorage({ token: apiKey });

// export const uploadToNFTStorage = async (file: File) => {
//   const cid = await client.storeBlob(file);
//   console.log("content id", cid)
//   return `https://ipfs.io/ipfs/${cid}`;
// };


export async function uploadFileToPinata(file: File) {
  const form = new FormData();

  // Append the file to the form data. 'file' is the field name and the second parameter should be the file object.
  form.append('file', file);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      // You might need to add your Pinata API Key and Secret API Key here
      'pinata_api_key': 'f0de47e4f4b9499105df',
      'pinata_secret_api_key': 'b590b937c091d5ff840d7460252dc658ea2db43e332d004eb9ebf9987a7649b8',
    },
    body: form,
  };

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', options);
    const data = await response.json();
    // console.log(data)
    return data.IpfsHash; // return the IPFS hash
  } catch (err) {
    console.error(err);
    throw err;
  }
}