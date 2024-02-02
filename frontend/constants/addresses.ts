import { getAccountPhrase } from "@rly-network/mobile-sdk";
import { ethers } from "ethers";

export const PROVIDER = "https://testnet-rpc.areon.network/";

export const artistNFTAddress = "0xa5a2f2207a138b4E7624ac50C0bF981889f19ec8";
export const filMediaMarketplaceAddress =
  "0x3D8c805Ca645Dc133DeaBe4e90C2e06Dc0EE4aA5";
export const dynamicNftAddress = "0x8096dBde35b88d769Ea850b4AB4149E725d731CB";
export const userNFTAddress = "0x2F17366446b0509128CB6518D326C3707B80c2f0";
export const artistFTAddress = "0xfb2f1068645105bbd4bff57723a5f6b3bf417a6f";

export const connectWithContract = async (
  contractAddress: string,
  contractAbi: any
) => {
  const mnemonic = await getAccountPhrase();
  if (!mnemonic) {
    throw new Error("Failed to retrieve account phrase");
  }
  const privateKey =
    ethers.Wallet.fromMnemonic(mnemonic)._signingKey().privateKey;
  const provider = new ethers.providers.JsonRpcProvider(PROVIDER);

  const wallet = new ethers.Wallet(privateKey, provider);

  const myContract = new ethers.Contract(contractAddress, contractAbi, wallet);
  return myContract;
};
