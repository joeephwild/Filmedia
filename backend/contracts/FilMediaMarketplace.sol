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

pragma solidity ^0.8.18;

// import {FilMediaToken} from "./FilMediaToken.sol";
import {IERC20} from "./interface/IERC20.sol";
import {IStructs} from "./interface/IStructs.sol";
import {IERC721} from "./interface/IERC721.sol";

contract FilMediaMarketplace is IStructs {
    // Constants for time calculations
    uint256 constant ONE_MONTH_SECONDS = 30 days;
    uint256 public lastTimeStamp;
    SubriberAnalytics[] isSubcribed; // addresses of user subcribed on the platform (to any artist)
    uint256[] artists; // addresses of user subcribed on the platform (to any artist)
    uint256[] _nfts; // addresses of user subcribed on the platform (to any artist)
    LastChecked lastChecked;
    bool private locked = false;

    /////// STRUCTS ////////
    struct User {
        address userAddress;
        uint256[] subcribeToTokenId; // this is the address he is subcribe to
    }

    struct ListMusicNFT {
        address nft;
        uint256 tokenId;
        uint256 artistTokenId;
    }

    // help get the number of streams
    struct Music {
        address nft;
        uint256 tokenId;
        uint256 streams;
        uint256 artistTokenId;
    }

    struct LastChecked {
        address artistAddress;
        address subcriberAddress;
        uint256 lastTimeStamp;
    }
    /////////// MAPPING /////////////////
    mapping(uint256 artistId => uint256) balance;
    mapping(uint256 => bool) anArtist;

    mapping(uint256 artistTokenId => mapping(uint256 _tokenId => ListMusicNFT))
        internal _listMusicNfts;
    mapping(uint256 tokenId => Music) music;
    mapping(uint256 tokenId => User) user;
    mapping(uint256 artistAddress => Artist) artist;

    mapping(uint256 subcriberAddress => SubriberAnalytics) subribeAnalytics;
    mapping(uint256 user => mapping(uint256 artist => SubriberAnalytics)) userIsSubcribedToAnalystics;
    mapping(uint256 user => mapping(uint256 artist => bool))
        public isSubscribed;
    //helps get the token id of a user
    mapping(uint256 user => mapping(uint256 artist => uint256)) public _tokenId;
    //helps get the month  a user is subcribed
    mapping(uint256 year => mapping(uint256 user => mapping(uint256 artist => bool)))
        public monthlySubcriptionBool;

    ////////////// EVENTS /////////////////
    event CreatedUserNFT(
        address indexed nft,
        uint256 indexed userTokenId,
        address indexed user,
        uint256 chainid
    );

    event CreatedArtistNFT(
        address indexed nft,
        uint256 indexed artistTokenId,
        address indexed artist,
        uint256 chainid
    );

    event ListedMusicNFT(
        address indexed nft,
        uint256 indexed tokenId,
        uint256 artistTokenId,
        address indexed artist,
        uint256 chainid
    );

    event SubcribedToArtist(
        address indexed subcriber,
        uint256 indexed artist,
        uint256 chainid
    );

    event CanceledSubcription(
        uint256 indexed subcriber,
        uint256 indexed artist,
        uint256 chainid
    );

    event ArtistAddedNFTs(
        uint256 indexed artist,
        string[3] indexed nfts,
        uint256 chainid
    );

    ////////////// MODIFIERS /////////////////

    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    /**
     * Network: Mumbai Testnet
     * Aggregator: ETH / USD
     * Address: 0x0715A7794a1dc8e42615F059dD6e406A6594651A
     */
    constructor() {
        lastTimeStamp = block.timestamp;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function createUser(address _nft, uint256 userTokenId) public {
        // @checks
        // check if a user exist already

        user[userTokenId] = User({
            userAddress: msg.sender,
            subcribeToTokenId: new uint256[](0)
        });

        emit CreatedUserNFT(_nft, userTokenId, msg.sender, block.chainid);
    }

    function createArtist(address _nft, uint256 tokenId) public {
        // @checks
        // check if a user exist already
        artist[tokenId] = Artist({
            artistAddress: msg.sender,
            tokenIds: new uint256[](0),
            allSubcribers: new address[](0),
            nfts: new string[](0),
            balance: 0
        });
        artists.push(tokenId);

        anArtist[tokenId] = true;

        emit CreatedArtistNFT(_nft, tokenId, msg.sender, block.chainid);
    }

    // @notice For Listing Artist music to the DB
    // @dev this adds the a user to the artist struct
    // @param no params
    // ✅
    function listNFT(
        address _nft,
        uint256 tokenId,
        uint256 artistTokenId
    ) public {
        Artist storage _artist = artist[artistTokenId];

        // @state changes
        require(_artist.artistAddress != address(0), "You are not an artist");
        require(anArtist[artistTokenId], "You are not an artist");

        _artist.tokenIds.push(tokenId);
        _nfts.push(tokenId);

        _listMusicNfts[artistTokenId][tokenId] = ListMusicNFT({
            nft: _nft,
            tokenId: tokenId,
            artistTokenId: artistTokenId
        });

        music[tokenId] = Music({
            nft: _nft,
            tokenId: tokenId,
            streams: 0,
            artistTokenId: artistTokenId
        });

        emit ListedMusicNFT(
            _nft,
            tokenId,
            artistTokenId,
            msg.sender,
            block.chainid
        );
    }

    // ✅
    function addNFTForArtist(
        uint256 _artistTokenId,
        string[3] memory nfts
    ) public {
        Artist storage artistStruct = artist[_artistTokenId];

        //@state changes
        for (uint i = 0; i < 3; i++) {
            artistStruct.nfts.push(nfts[i]);
        }

        emit ArtistAddedNFTs(_artistTokenId, nfts, block.chainid);
    }

    // @notice For Subcribing to a particular artist
    // @dev this adds the a user to the artist struct
    // @param  __artistAddr: address of artist
    // ✅
    function subcribeToArtist(
        uint256 _artistTokenId,
        uint256 _userTokenId
    ) public payable {
        User storage _user = user[_userTokenId];
        Artist storage _aritst = artist[_artistTokenId];

        // @checks
        require(msg.value >= 0.1 ether, "Insufficient Funds");
        require(
            !isSubscribed[_userTokenId][_artistTokenId],
            "Already subscribed"
        );

        (bool success, ) = payable(address(this)).call{value: msg.value}("");
        require(success, "Unable to send ether");

        // @state changes
        _aritst.allSubcribers.push(msg.sender);

        isSubscribed[_userTokenId][_artistTokenId] = true;
        monthlySubcriptionBool[block.timestamp][_userTokenId][
            _artistTokenId
        ] = true;

        _user.subcribeToTokenId.push(_artistTokenId);

        userIsSubcribedToAnalystics[_userTokenId][
            _artistTokenId
        ] = SubriberAnalytics({
            lastPaymentTimestamp: block.timestamp,
            artist: _artistTokenId,
            subcriberTokenId: _userTokenId,
            currentlySubcribed: true,
            subcribedDate: block.timestamp
        });
        isSubcribed.push(
            SubriberAnalytics({
                lastPaymentTimestamp: block.timestamp,
                artist: _artistTokenId,
                subcriberTokenId: _userTokenId,
                currentlySubcribed: true,
                subcribedDate: block.timestamp
            })
        );
        emit SubcribedToArtist(msg.sender, _artistTokenId, block.chainid);
    }

    // ✅
    function cancelSubcribtion(
        uint256 _artistTokenId,
        uint256 _userTokenId
    ) public {
        // @DO's
        // remove the user from the artist address
        // change user currently subcrib to false
        /// after removing, VRF wont be able to deduct money
        SubriberAnalytics
            storage _currentlySubribed = userIsSubcribedToAnalystics[
                _userTokenId
            ][_artistTokenId];

        // @state changes
        _currentlySubribed.currentlySubcribed = false;
        isSubscribed[_userTokenId][_artistTokenId] = false;
        monthlySubcriptionBool[block.timestamp][_artistTokenId][
            _artistTokenId
        ] = false;

        emit CanceledSubcription(_userTokenId, _artistTokenId, block.chainid);
    }

    function setTokenId(
        uint256 subcriberTokenId,
        uint256 artistTokenId,
        uint256 tokenId,
        address _nftAddress
    ) external {
        // some important chekcs here
        // check if the caller is the owner of the NFT
        require(
            IERC721(_nftAddress).ownerOf(tokenId) == msg.sender,
            "You are not owner, cant set token id"
        );
        _tokenId[subcriberTokenId][artistTokenId] = tokenId;
    }

    //////////////// GETTERS (PURE AND VIEW)/////////////////////////
    function checkIfUserIsSubcribed(
        uint256 subcriberTokenId,
        uint256 artistTokenId
    ) external view returns (bool _isSubcribedBool) {
        return isSubscribed[artistTokenId][subcriberTokenId];
    }

    function getSubcribers()
        external
        view
        returns (SubriberAnalytics[] memory)
    {
        return isSubcribed;
    }

    function getAllArtists() external view returns (uint256[] memory) {
        return artists;
    }

    function getAnalytics(
        uint256 subcriberTokenId,
        uint256 artistTokenId
    ) external view returns (SubriberAnalytics memory) {
        return userIsSubcribedToAnalystics[subcriberTokenId][artistTokenId];
    }

    function getTokenId(
        uint256 subcriberTokenId,
        uint256 artistTokenId
    ) external view returns (uint256) {
        return _tokenId[subcriberTokenId][artistTokenId];
    }

    function getMusicNFT(
        uint256 tokenId,
        uint256 _artistTokenId
    ) external view returns (ListMusicNFT memory) {
        return _listMusicNfts[_artistTokenId][tokenId];
    }

    function getMusic(uint256 tokenId) external view returns (Music memory) {
        return music[tokenId];
    }

    function getArtist(
        uint256 _artistTokenId
    ) external view returns (Artist memory) {
        return artist[_artistTokenId];
    }

    function getUser(uint256 _userTokenId) external view returns (User memory) {
        return user[_userTokenId];
    }

    function getUserBalance(uint256 artistId) external view returns (uint256) {
        return balance[artistId];
    }

    function isWalletAnArtist(
        uint256 artistTokenId
    ) external view returns (bool) {
        return anArtist[artistTokenId];
    }
}
