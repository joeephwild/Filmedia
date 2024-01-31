// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {IMarketplace} from "./interface/IMarketplace.sol";
import {IStructs} from "./interface/IStructs.sol";

contract FilMediaDynamicNFT is ERC721Enumerable, ERC721URIStorage, IStructs {
    uint256 private lastCheckedBlock;
    uint constant ONE_YEAR_SECONDS = 1 minutes; // for testing (is actually 365 days)
    uint constant THREE_YEAR_SECONDS = 5 minutes; // for testing (is actually 1095 days)
    IMarketplace _iMarketplace;

    uint256 private _nextTokenId;

    constructor(address marketplacrAddr) ERC721("DynamicNft", "DNFT") {
        lastCheckedBlock = block.number; // Initialize with the current block number
        _iMarketplace = IMarketplace(marketplacrAddr);
    }

    // ✅
    function safeMint(uint256 artistTokenId, uint256 userTokenId) public {
        //@checks
        // check if a user is subcribed
        // check if a user has minted for a particular artist
        bool isSubcribed = _iMarketplace.checkIfUserIsSubcribed(
            userTokenId,
            artistTokenId
        );
        // @checks
        require(isSubcribed, "You are not subcribed");

        Artist memory artistStruct = _iMarketplace.getArtist(artistTokenId);

        _nextTokenId++;
        _safeMint(msg.sender, _nextTokenId);
        _setTokenURI(_nextTokenId, artistStruct.nfts[0]);
    }

    // / @notice Update User NFT
    // / @dev This checks if one year has passed then update
    // / @param Documents a parameter just like in doxygen (must be followed by parameter name)
    // ✅
    function updateDynamicImage() public {
        // Determine the parity of the latest block number (even or odd)
        SubriberAnalytics[] memory isSubcribed = _iMarketplace.getSubcribers();

        for (uint i = 0; i < isSubcribed.length; i++) {
            uint256 artistTokenId = isSubcribed[i].artist;
            uint256 subcriberTokenId = isSubcribed[i].subcriberTokenId;

            Artist memory artistStruct = _iMarketplace.getArtist(artistTokenId);

            SubriberAnalytics memory analystics = _iMarketplace.getAnalytics(
                subcriberTokenId,
                artistTokenId
            );
            uint256 tokenId = _iMarketplace.getTokenId(
                subcriberTokenId,
                artistTokenId
            );

            string memory newImageURI;

            if (
                (block.timestamp - analystics.subcribedDate) >
                THREE_YEAR_SECONDS
            ) {
                // If it has passed three year
                newImageURI = artistStruct.nfts[3];
                _setTokenURI(tokenId, newImageURI);
            } else if (
                (block.timestamp - analystics.subcribedDate) > ONE_YEAR_SECONDS
            ) {
                // If it has passed one year
                newImageURI = artistStruct.nfts[2];
                _setTokenURI(tokenId, newImageURI);
            }
        }

        // Update the token URI of all NFTs with the new image URI
    }

    function getTokenUri(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function getTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    //determine the stage of the NFT
    function getStage(uint256 tokenId) public view returns (uint256) {
        string memory _uri = tokenURI(tokenId);

        uint256 id;
        //seed
        if (
            keccak256(abi.encodePacked((_uri))) ==
            keccak256(
                abi.encodePacked(
                    (
                        "https://bafkreibn2ed22zc4h7rhtknra2c5vjjfxtkh7y36nd3mbtd6q6bh5pjs5a.ipfs.nftstorage.link/"
                    )
                )
            )
        ) {
            return id = 0;
        }
        return id;
    }

    // The following functions are overrides required by Solidity.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
