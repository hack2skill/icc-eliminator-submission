// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicNft is ERC721, Ownable {
    // string public constant TOKEN_URI =
    //     "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm";
    uint256 private s_tokenCounter;
    mapping(uint256 => string) public tokenUris;
    mapping(uint256 => bool) public onSale;
    mapping(uint256 => uint256) public price;

    constructor() ERC721("CRICKET", "ICC") {
        s_tokenCounter = 0;
    }

    function mintNft(string memory tokenUri) public onlyOwner {
        s_tokenCounter = s_tokenCounter + 1;
        tokenUris[s_tokenCounter] = tokenUri;
        _safeMint(msg.sender, s_tokenCounter);
    }

    function setOnSale(uint256 tokenId, uint256 _price) public onlyOwner {
        price[tokenId] = _price;
        onSale[tokenId] = true;
    }

    function buyTokens(uint256 tokenId) public payable {
        require(onSale[tokenId], "NFT not on sale");
        require(msg.value >= price[tokenId], "insufficient balance");
        (bool callSuccess, ) = payable(owner()).call{value: price[tokenId]}("");
        require(callSuccess, "Call failed");
        _transfer(owner(), msg.sender, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            s_tokenCounter <= tokenId,
            "ERC721Metadata: URI query for nonexistent token"
        );
        return tokenUris[tokenId];
    }

    function getPrice(uint256 tokenId) public view returns (uint256) {
        return price[tokenId];
    }

    function checkSale(uint256 tokenId) public view returns (bool) {
        return onSale[tokenId];
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
