import {
  ArtistAddedNFTs as ArtistAddedNFTsEvent,
  CanceledSubcription as CanceledSubcriptionEvent,
  ListedMusicNFT as ListedMusicNFTEvent,
  SubcribedToArtist as SubcribedToArtistEvent,
} from "../generated/Contract/Contract";
import {
  ArtistAddedNFTs,
  CanceledSubcription,
  ListedMusicNFT,
  SubcribedToArtist,
} from "../generated/schema";

export function handleArtistAddedNFTs(event: ArtistAddedNFTsEvent): void {
  let entity = new ArtistAddedNFTs(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.artist = event.params.artist;
  // entity.nfts = event.params.nfts
  entity.chainid = event.params.chainid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCanceledSubcription(
  event: CanceledSubcriptionEvent
): void {
  let entity = new CanceledSubcription(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.subcriber = event.params.subcriber;
  entity.artist = event.params.artist;
  entity.chainid = event.params.chainid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleListedMusicNFT(event: ListedMusicNFTEvent): void {
  let entity = new ListedMusicNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nft = event.params.nft;
  entity.tokenId = event.params.tokenId;
  entity.artist = event.params.artist;
  entity.chainid = event.params.chainid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSubcribedToArtist(event: SubcribedToArtistEvent): void {
  let entity = new SubcribedToArtist(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.subcriber = event.params.subcriber;
  entity.artist = event.params.artist;
  entity.chainid = event.params.chainid;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
