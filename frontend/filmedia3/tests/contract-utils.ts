import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ArtistAddedNFTs,
  CanceledSubcription,
  ListedMusicNFT,
  SubcribedToArtist
} from "../generated/Contract/Contract"

export function createArtistAddedNFTsEvent(
  artist: Address,
  nfts: Array<string>,
  chainid: BigInt
): ArtistAddedNFTs {
  let artistAddedNfTsEvent = changetype<ArtistAddedNFTs>(newMockEvent())

  artistAddedNfTsEvent.parameters = new Array()

  artistAddedNfTsEvent.parameters.push(
    new ethereum.EventParam("artist", ethereum.Value.fromAddress(artist))
  )
  artistAddedNfTsEvent.parameters.push(
    new ethereum.EventParam("nfts", ethereum.Value.fromStringArray(nfts))
  )
  artistAddedNfTsEvent.parameters.push(
    new ethereum.EventParam(
      "chainid",
      ethereum.Value.fromUnsignedBigInt(chainid)
    )
  )

  return artistAddedNfTsEvent
}

export function createCanceledSubcriptionEvent(
  subcriber: Address,
  artist: Address,
  chainid: BigInt
): CanceledSubcription {
  let canceledSubcriptionEvent = changetype<CanceledSubcription>(newMockEvent())

  canceledSubcriptionEvent.parameters = new Array()

  canceledSubcriptionEvent.parameters.push(
    new ethereum.EventParam("subcriber", ethereum.Value.fromAddress(subcriber))
  )
  canceledSubcriptionEvent.parameters.push(
    new ethereum.EventParam("artist", ethereum.Value.fromAddress(artist))
  )
  canceledSubcriptionEvent.parameters.push(
    new ethereum.EventParam(
      "chainid",
      ethereum.Value.fromUnsignedBigInt(chainid)
    )
  )

  return canceledSubcriptionEvent
}

export function createListedMusicNFTEvent(
  nft: Address,
  tokenId: BigInt,
  artist: Address,
  chainid: BigInt
): ListedMusicNFT {
  let listedMusicNftEvent = changetype<ListedMusicNFT>(newMockEvent())

  listedMusicNftEvent.parameters = new Array()

  listedMusicNftEvent.parameters.push(
    new ethereum.EventParam("nft", ethereum.Value.fromAddress(nft))
  )
  listedMusicNftEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listedMusicNftEvent.parameters.push(
    new ethereum.EventParam("artist", ethereum.Value.fromAddress(artist))
  )
  listedMusicNftEvent.parameters.push(
    new ethereum.EventParam(
      "chainid",
      ethereum.Value.fromUnsignedBigInt(chainid)
    )
  )

  return listedMusicNftEvent
}

export function createSubcribedToArtistEvent(
  subcriber: Address,
  artist: Address,
  chainid: BigInt
): SubcribedToArtist {
  let subcribedToArtistEvent = changetype<SubcribedToArtist>(newMockEvent())

  subcribedToArtistEvent.parameters = new Array()

  subcribedToArtistEvent.parameters.push(
    new ethereum.EventParam("subcriber", ethereum.Value.fromAddress(subcriber))
  )
  subcribedToArtistEvent.parameters.push(
    new ethereum.EventParam("artist", ethereum.Value.fromAddress(artist))
  )
  subcribedToArtistEvent.parameters.push(
    new ethereum.EventParam(
      "chainid",
      ethereum.Value.fromUnsignedBigInt(chainid)
    )
  )

  return subcribedToArtistEvent
}
