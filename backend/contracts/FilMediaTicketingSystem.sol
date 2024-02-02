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

import {IStructs} from './interface/IStructs.sol';

contract FilMediaTicketingSystem {
    address i_filMediaMarketplace;

    constructor(address _filMediaMarketplace) {
        _filMediaMarketplace = i_filMediaMarketplace;
    }

    struct Ticket {
        address creator;
        uint256 deadline;
        uint256 tokenId;
        address[] attending;
        uint256 fee;
    }
    mapping(uint256 => Ticket) _ticket;

    event CreatedTicket(
        address indexed owner,
        uint256 indexed tokenId,
        address nft,
        uint256 chainid
    );

    // / @notice Helps in creating ticket for an artist
    // / @dev - the function creates ticket for an artist basically
    // / @param - soon
    function createTicket(uint256 fee, uint256 deadline, uint256 tokenId, address nft) public {
        // @state-changes
        _ticket[tokenId] = Ticket({
            creator: msg.sender,
            deadline: deadline,
            tokenId: tokenId,
            attending: new address[](0),
            fee: fee
        });

        emit CreatedTicket(msg.sender, tokenId, nft, block.chainid);
    }

    function buyTicket(uint256 tokenId) public payable {
        Ticket storage ticket = _ticket[tokenId];

        // @checks
        require(msg.value >= ticket.fee, 'Insufficient Funds');

        (bool success, ) = payable(address(this)).call{value: ticket.fee}('');
        require(success, 'Unable to send ether');

        ticket.attending.push(msg.sender);
    }

    //////////////// GETTERS (PURE AND VIEW)/////////////////////////
    function getTicket(uint256 tokenId) public view returns (Ticket memory) {
        return _ticket[tokenId];
    }
}
