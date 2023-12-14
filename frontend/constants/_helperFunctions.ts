import { ethers } from "ethers";
import {
  PROVIDER,
  filMediaMarketplaceAddress,
  dynamicNftAddress,
  artistNFTAddress,
} from "./addresses";
import filMediaMarketplaceAbi from "./abis/FilMediaMarketplace.json";
import dynamicNftAbi from "./abis/FilMediaDynamicNFTAbi.json";
import artistNFTAbi from "./abis/FilMediaArtistNFTAbi.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { getAccountPhrase } from "@rly-network/mobile-sdk";

let filMediaMarketplaceContract: any,
  dynamicNftContract: any,
  artistNFTContract: any,
  signer: any;

const connect = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(PROVIDER);
    const phrase = await getAccountPhrase();
    if (phrase === null || phrase === undefined) {
      throw new Error("Failed to get account phrase");
    }
    const mnemonic: string = phrase;
    const wallet = ethers.Wallet.fromPhrase(mnemonic);

    signer = new ethers.Wallet(wallet.privateKey, provider);

    filMediaMarketplaceContract = new ethers.Contract(
      filMediaMarketplaceAddress,
      filMediaMarketplaceAbi,
      signer
    );
    dynamicNftContract = new ethers.Contract(
      dynamicNftAddress,
      dynamicNftAbi,
      signer
    );
    artistNFTContract = new ethers.Contract(
      artistNFTAddress,
      artistNFTAbi,
      signer
    );
  } catch (error) {
    Alert.alert("Conract not functioning");
    console.error(error);
  }
};
connect();

///////////////// MARKETPLACE CONTRACT  //////////////////////////////
// Function to interact with the "listNFT" Solidity function
export const _listNFT = async ({
  _nft,
  tokenId,
  _artistAddr,
}: {
  _nft: string;
  tokenId: number;
  _artistAddr: string;
}): Promise<boolean> => {
  try {
    const tx = await filMediaMarketplaceContract.listNFT(
      _nft,
      tokenId,
      _artistAddr
    );
    await tx.wait();
    console.log("Transaction successful:", tx.hash);

    return true;
  } catch (error) {
    console.error("Error listing NFT:", error);
    return false;
  }
};

// Function to interact with the "addNFTForArtist" Solidity function
export const _addNFTForArtist = async ({
  _artistAddr,
  nfts,
}: {
  _artistAddr: string;
  nfts: any[];
}): Promise<void> => {
  try {
    const tx = await filMediaMarketplaceContract.addNFTForArtist(
      _artistAddr,
      nfts
    );
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error adding NFTs for artist:", error);
  }
};

// Function to interact with the "deposit" Solidity function
export const _deposit = async ({
  value,
}: {
  value: string;
}): Promise<boolean> => {
  try {
    const valueToSend = ethers.parseEther(value); // Replace '1' with the desired amount in ETH
    console.log("depositing.........");
    const tx = await filMediaMarketplaceContract.deposit({
      value: valueToSend,
    });

    console.log("Transaction successful:", tx.hash);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error depositing ETH:", error);
    return false;
  }
};

// Function to interact with the "subcribeToArtist" Solidity function
export const _subcribeToArtist = async ({
  _artistAddr,
}: {
  _artistAddr: string | string[];
}): Promise<boolean> => {
  try {
    const tx = await filMediaMarketplaceContract.subcribeToArtist(
      _artistAddr,
      1
    );
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
    return true;
  } catch (error) {
    console.error("Error subscribing to artist:", error);
    return false;
  }
};

// Function to interact with the "cancelSubcribtion" Solidity function
export const _cancelSubcribtion = async ({
  _artistAddr,
}: {
  _artistAddr: string | string[];
}): Promise<void> => {
  try {
    const tx = await filMediaMarketplaceContract(_artistAddr);
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error canceling subscription:", error);
  }
};

// Function to interact with the "setTokenId" Solidity function
export const _setTokenId = async ({
  subcriberAddress,
  artistAddress,
  tokenId,
  nftAddress,
}: {
  subcriberAddress: string;
  artistAddress: string | string[];
  tokenId: string;
  nftAddress: string;
}): Promise<boolean> => {
  try {
    const tx = await filMediaMarketplaceContract.setTokenId(
      subcriberAddress,
      artistAddress,
      tokenId,
      nftAddress
    );
    await tx.wait();

    return true;
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error setting token ID:", error);

    return false;
  }
};

// Function to interact with the "checkIfUserIsSubcribed" Solidity function
export const _checkIfUserIsSubcribed = async ({
  subcriberAddress,
  artistAddress,
}: {
  subcriberAddress: string;
  artistAddress: string;
}): Promise<void> => {
  try {
    const isSubscribed = await filMediaMarketplaceContract(
      subcriberAddress,
      artistAddress
    );
    console.log("Is user subscribed:", isSubscribed);
  } catch (error) {
    console.error("Error checking subscription status:", error);
  }
};

// Function to interact with the "getSubcribers" Solidity function
export const getSubcribers = async (): Promise<any> => {
  try {
    const subcribers = await filMediaMarketplaceContract.getSubcribers();
    return subcribers;
  } catch (error) {
    console.error("Error calling getSubcribers:", error);
    return [];
  }
};

// Function to interact with the "getAnalytics" Solidity function
export const _getAnalytics = async ({
  subcriberAddress,
  artistAddress,
}: {
  subcriberAddress: string;
  artistAddress: string;
}): Promise<any> => {
  try {
    const analytics = await filMediaMarketplaceContract.getAnalytics(
      subcriberAddress,
      artistAddress
    );
    return analytics;
  } catch (error) {
    console.error("Error calling getAnalytics:", error);
  }
};

// Function to interact with the "getTokenId" Solidity function
export const _getTokenId = async ({
  subcriberAddress,
  artistAddress,
}: {
  subcriberAddress: string;
  artistAddress: string;
}): Promise<number> => {
  try {
    const tokenId = await filMediaMarketplaceContract.getTokenId(
      subcriberAddress,
      artistAddress
    );
    return tokenId;
  } catch (error) {
    console.error("Error calling getTokenId:", error);
    return 0;
  }
};

// Function to interact with the "getMusicNFT" Solidity function
export const _getMusicNFT = async ({
  tokenId,
  artistAddress,
}: {
  tokenId: number;
  artistAddress: string;
}): Promise<any> => {
  try {
    const musicNFT = await filMediaMarketplaceContract.getMusicNFT(
      tokenId,
      artistAddress
    );
    return musicNFT;
  } catch (error) {
    console.error("Error calling getMusicNFT:", error);
  }
};

// Function to interact with the "getMusic" Solidity function
export const _getMusic = async ({
  tokenId,
}: {
  tokenId: number;
}): Promise<any> => {
  try {
    const musicInfo = await filMediaMarketplaceContract.getMusic(tokenId);
    return musicInfo;
  } catch (error) {
    console.error("Error calling getMusic:", error);
  }
};

// Function to interact with the "getArtist" Solidity function
export const _getArtist = async ({
  artistAddress,
}: {
  artistAddress: string;
}): Promise<any> => {
  try {
    const artistInfo = await filMediaMarketplaceContract.getArtist(
      artistAddress
    );
    return artistInfo;
  } catch (error) {
    console.error("Error calling getArtist:", error);
  }
};

export const _isWalletAnArtist = async ({
  artistAddress,
}: {
  artistAddress: string;
}): Promise<boolean> => {
  try {
    const isAnArtist = await filMediaMarketplaceContract.isWalletAnArtist(
      artistAddress
    );
    return isAnArtist;
  } catch (error) {
    console.error("Error calling getArtist:", error);

    return false;
  }
};

export const _getAllArtist = async (): Promise<any> => {
  try {
    const artists = await filMediaMarketplaceContract.getAllArtists();
    return artists;
  } catch (error) {
    console.error("Error calling getArtist:", error);

    return "Unable to get artist";
  }
};

// Function to interact with the "getUser" Solidity function
export const _getUser = async ({
  userAddress,
}: {
  userAddress: string;
}): Promise<any> => {
  try {
    const userInfo = await filMediaMarketplaceContract.getUser(userAddress);
    return userInfo;
  } catch (error) {
    console.error("Error calling getUser:", error);
  }
};

// Function to interact with the "getUserBalance" Solidity function
export const _getUserBalance = async ({
  userAddress,
}: {
  userAddress: string;
}): Promise<number> => {
  try {
    const balance = await filMediaMarketplaceContract.getUserBalance(
      userAddress
    );
    console.log(balance, "this is the balance sjsjsjsjsjjssjsjsjjs");
    return balance;
  } catch (error) {
    console.error("Error calling getUserBalance:", error);
    return 0;
  }
};

///////////////// DYNAMIC NFT CONTRACT  //////////////////////////////
// Function to interact with the "safeMint" Solidity function
export const _safeMint = async ({
  artistAddress,
}: {
  artistAddress: string | string[];
}): Promise<boolean> => {
  try {
    const tx = await dynamicNftContract.safeMint(artistAddress, 1);
    await tx.wait();
    console.log("Transaction successful:", tx.hash);

    return true;
  } catch (error) {
    console.error("Error calling safeMint:", error);

    return false;
  }
};

// Function to interact with the "getTokenUri" Solidity function
export const _getTokenUri = async ({
  tokenId,
}: {
  tokenId: number;
}): Promise<void> => {
  try {
    const uri = await dynamicNftContract.getTokenUri(tokenId);
    console.log("Token URI:", uri);
  } catch (error) {
    console.error("Error calling getTokenUri:", error);
  }
};

// Function to interact with the "getTokenId" Solidity function
export const _getTokenIdDynamicNFT = async (): Promise<number> => {
  try {
    const tokenId = await dynamicNftContract.getTokenId();
    console.log("Token ID:", tokenId);

    return tokenId;
  } catch (error) {
    console.error("Error calling getTokenId:", error);

    return 0;
  }
};

///////////////// ARRIST NFT CONTRACT  //////////////////////////////
// Function to interact with the "safeMint" Solidity function
export const _safeMintArtist = async ({
  artistAddress,
  uri,
}: {
  artistAddress: string;
  uri: string;
}): Promise<void> => {
  try {
    const tx = await artistNFTContract.mint(artistAddress, uri);
    await tx.wait();
    console.log("Transaction successful:", tx.hash);
  } catch (error) {
    console.error("Error calling safeMint:", error);
  }
};

export const _getTokenUriArtist = async ({
  tokenId,
}: {
  tokenId: number;
}): Promise<string> => {
  try {
    const uri: any = await artistNFTContract.tokenURI(Number(tokenId));
    console.log("Token URI:", uri);

    return uri;
  } catch (error) {
    console.error("Error calling getTokenUri:", error);
    return "Unable to get URI for artist";
  }
};

// Function to interact with the "getTokenId" Solidity function
export const _getTokenIdArtist = async (): Promise<any> => {
  try {
    const tokenId = await artistNFTContract.getCurrentTokenId();
    console.log("Token ID:", tokenId);

    return tokenId;
  } catch (error) {
    console.error("Error calling getTokenId:", error);
  }
};

/////////// OTHER FUNCTIONS////////////////
export const _getWalletAddress = async (): Promise<string> => {
  try {
    const user: any = await AsyncStorage.getItem("user");

    let walletAddress: string;

    if (user) {
      const parseUser = JSON.parse(user);
      walletAddress = parseUser.walletAddress;
    } else {
      Alert.alert("User Not found");
      walletAddress = "0x0000000000000000000000000000";
    }
    return walletAddress;
  } catch (error) {
    console.log(error);
    Alert.alert("User");

    return "Something went wrong";
  }
};

export const _getUserFromLocalStorage = async (): Promise<any> => {
  try {
    const user: any = await AsyncStorage.getItem("user");
    const parseUser = JSON.parse(user);

    return parseUser;
  } catch (error) {
    console.log(error);
    Alert.alert("User");

    return "Something went wrong";
  }
};

// export const _getAWalletNFT = async (): Promise<any> => {
//   try {

//     const address: string = _getWalletAddress();
//     const balance = await artistNFTContract.balanceOf(
//       "0x74F60116FFd090ee71F6c1E5a530D036Aad02818"
//     );
//     const nfts = [];
//     for (let i = 1; i < balance; i++) {
//       const tokenId = await dynamicNftContract.tokenOfOwnerByIndex(address, i);
//       nfts.push(tokenId);
//     }
//     return nfts;
//   } catch (error) {
//     console.log(error, "error getting nfts");
//     Alert.alert("Something went wrong getting NFT's");
//     return "Something went wrong getting NFT's";
//   }
// };

export const _createWallet = async (): Promise<any> => {
  try {
    const walletData: any | null = ethers.Wallet.createRandom();
    let phrase, privateKey, walletAddress;

    if (walletData != null) {
      phrase = walletData.mnemonic.phrase;
      privateKey = walletData.privateKey;
      walletAddress = new ethers.Wallet(privateKey).address;

      console.log("This is the", privateKey, walletAddress);
    }
    return { privateKey, walletAddress, phrase };
  } catch (error) {
    Alert.alert("User");
    return "Something went wrong";
  }
};
