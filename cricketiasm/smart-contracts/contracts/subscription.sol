// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionNFT is ERC721, Ownable {
    uint256 private s_subscriptionPrice;
    uint256 private s_subscriptionDuration;
    // uint256 subscriptionEnd;
    address payable creator;
    uint256 public nftId;
    uint256 public s_nftCount;
    string public TOKEN_URI;
    // "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm";
    mapping(address => uint256) public subscriptionExpiry;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _subscriptionPrice,
        uint256 _subscriptionDuration,
        uint256 nftCount,
        string memory tokenUri
    ) ERC721(_name, _symbol) {
        creator = payable(msg.sender);
        s_subscriptionPrice = _subscriptionPrice;
        s_subscriptionDuration = _subscriptionDuration;
        s_nftCount = nftCount;
        nftId = 0;
        TOKEN_URI = tokenUri;
    }

    function subscribe() public payable {
        require(nftId < s_nftCount, "All passes are sold");
        require(
            msg.value >= s_subscriptionPrice,
            "Incorrect subscription price"
        );
        require(
            subscriptionExpiry[msg.sender] < block.timestamp,
            "Subscription is still active"
        );

        subscriptionExpiry[msg.sender] =
            block.timestamp +
            s_subscriptionDuration;
        nftId += 1;
        _safeMint(msg.sender, nftId);
    }

    function _beforeTokenTransfer(
        address from,
        address,
        uint256 /* firstTokenId */,
        uint256
    ) internal view override {
        require(isSubscribed(from), "your subscription is over");
    }

    function withdraw() public onlyOwner {
        require(msg.sender == creator, "Only the creator can withdraw funds");
        creator.transfer(address(this).balance);
    }

    function tokenURI(uint256) public view override returns (string memory) {
        // require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function isSubscribed(address _subscriber) public view returns (bool) {
        return subscriptionExpiry[_subscriber] >= block.timestamp;
    }

    function timeLeft(address _subscriber) public view returns (uint256) {
        return block.timestamp - subscriptionExpiry[_subscriber];
    }

    function subscriptionPrice() public view returns (uint256) {
        return s_subscriptionPrice;
    }
}
