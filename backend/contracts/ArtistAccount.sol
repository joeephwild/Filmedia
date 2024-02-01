// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importing the FilAccount contract
import { FilAccount } from "./FilAccount.sol";

/**
 * @title MyContract
 * @dev This contract manages accounts and tokens.
 */
contract MyContract {
   // Reference to the FilAccount contract
   FilAccount private filAccountAddress;

   /**
    * @dev Structure representing an account.
    */
   struct Account {
       // URI associated with the account
       string uri;
       // Owner of the account
       address owner;
   }

   // Array of all accounts
   Account[] public arrayOfAccount;

   // Mapping from account owner's address to their account
   mapping (address => Account) private addressToAccount;

   /**
    * @dev Constructs a new MyContract.
    * @param _filAccountAddress Address of the FilAccount contract.
    */
   constructor(address _filAccountAddress) {
       // Initialize the FilAccount contract
       filAccountAddress = FilAccount(_filAccountAddress);
   }

   /**
    * @dev Creates a new account.
    * @param _uri URI associated with the account.
    */
   function createAnAccount(string memory _uri) external {
       // Create a new account
       Account storage newAcc = addressToAccount[msg.sender];
       // Set the owner of the account
       newAcc.owner = msg.sender;
       // Set the URI of the account
       newAcc.uri = _uri;
       // Add the account to the array
       arrayOfAccount.push(newAcc);
       // Mint a new token for the account
       filAccountAddress.safeMint(msg.sender, _uri);
   }

   /**
    * @dev Pauses the account.
    */
   function pauseAccount () external {
       // Pause the account
       filAccountAddress.pause();
   }

   /**
    * @dev Unpauses the account.
    */
   function unPauseAccount () external {
       // Unpause the account
       filAccountAddress.unpause();
   }

   /**
    * @dev Burns an account.
    * @param _tokenId ID of the token to burn.
    */
   function burnAccount(uint56 _tokenId) external {
       // Burn the account
       filAccountAddress.burn(_tokenId);
   }
}