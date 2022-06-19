// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";


contract GreenDAO is ERC721 {
    string[] public names;
    mapping(string => bool) public nameExists;


    modifier uniqueName(string memory _name) {
        require(!nameExists[_name], "Names must be unique"); 
        _;
    }

    constructor() ERC721("GreenDAO", "GREEN") {
      console.log("Deploying a GreenDAO with `GREEN` symbol.");

    }

    function mint(string memory _name) public uniqueName(_name) {
        nameExists[_name] = true;
        names.push(_name);
        uint newItemId = names.length - 1;
        _safeMint(msg.sender, newItemId);
    }
}