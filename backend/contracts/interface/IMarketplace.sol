// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.18;

import {IStructs} from "./IStructs.sol";

interface IMarketplace is IStructs {
    // Functions
    function checkIfUserIsSubcribed(
        address artistAddr
    ) external view returns (SubriberAnalytics memory _analytics);

    function getSubcribers() external view returns (SubriberAnalytics[] memory);

    function getAnalytics(
        uint256 subcriberTokenId,
        uint256 artistTokenId
    ) external view returns (SubriberAnalytics memory);

    function getTokenId(
        uint256 subcriberTokenId,
        uint256 artistTokenId
    ) external view returns (uint256);

    function getArtist(
        uint256 _artistTokenId
    ) external view returns (Artist memory);

    function checkIfUserIsSubcribed(
        uint256 subcriberTokenId,
        uint256 artistTokenId
    ) external view returns (bool _isSubcribedBool);
}
