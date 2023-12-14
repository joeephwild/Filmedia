import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ArtistAddedNFTs } from "../generated/schema"
import { ArtistAddedNFTs as ArtistAddedNFTsEvent } from "../generated/Contract/Contract"
import { handleArtistAddedNFTs } from "../src/contract"
import { createArtistAddedNFTsEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let artist = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let nfts = ["Example string value"]
    let chainid = BigInt.fromI32(234)
    let newArtistAddedNFTsEvent = createArtistAddedNFTsEvent(
      artist,
      nfts,
      chainid
    )
    handleArtistAddedNFTs(newArtistAddedNFTsEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ArtistAddedNFTs created and stored", () => {
    assert.entityCount("ArtistAddedNFTs", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ArtistAddedNFTs",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "artist",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ArtistAddedNFTs",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nfts",
      "[Example string value]"
    )
    assert.fieldEquals(
      "ArtistAddedNFTs",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "chainid",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
