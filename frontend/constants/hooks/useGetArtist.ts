import React, { useEffect, useState } from "react";
import { _getTokenUriArtist } from "../_helperFunctions";

const useGetArtist = (tokenId: number, nft: any) => {
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [category, setCategory] = useState("");

  async function updateUI() {
    console.log(tokenId, " thsususuuuuuuuuuuuuuuuuuuu");
    // const tokenURI: any = await _getTokenUriArtist({
    //   tokenId: tokenId - 1,
    // });

    let tokenURI =
      tokenId == 1
        ? "https://gateway.pinata.cloud/ipfs/QmNT9dVCgGfxEViKZzYLhH114rgiYDT227cVDYVz1y3zvH"
        : tokenId == 2
        ? "https://gateway.pinata.cloud/ipfs/QmPxAHuKS4CAmNepxAaDxCbgKzZW3hPnDYk9B19KWt35BM"
        : "https://gateway.pinata.cloud/ipfs/QmYGgPqaC483J5B9KczHRV9t1fDRkFtiLo5J2zMvqcZWuv";

    console.log(`The TokenURI is ${tokenURI}`, typeof tokenId);
    // We are going to cheat a little here...
    // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
    const requestURL = tokenURI;
    const tokenURIResponse = await (await fetch(requestURL)).json();
    console.log(tokenURIResponse);
    const imageURI = tokenURIResponse.image;
    setImageURI(imageURI);
    setTokenName(tokenURIResponse.name);
    setTokenDescription(tokenURIResponse.description);
    setCategory(tokenURIResponse.category);

    // We could render the Image on our sever, and just call our sever.
    // For testnets & mainnet -> use moralis server hooks
    // Have the world adopt IPFS
    // Build our own IPFS gateway

    // get the tokenURI
    // using the image tag from the tokenURI, get the image
  }

  useEffect(() => {
    // if (location.pathname.includes("nftmarketplace")) {
    updateUI();
    // }
  }, []);

  return [imageURI, tokenName, tokenDescription, category, updateUI];
};

export default useGetArtist;
