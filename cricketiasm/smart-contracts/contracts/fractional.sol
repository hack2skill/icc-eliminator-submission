// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ICCErc20 is ERC20, Ownable {
    uint256 public s_price;
    address public s_nftAddress;
    uint256 public s_tokenId;

    constructor(
        uint256 _initialSupply,
        address _token,
        uint256 _tokenId,
        uint256 _listPrice,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        s_price = _listPrice;
        s_nftAddress = _token;
        s_tokenId = _tokenId;
        mintTokens(_initialSupply);
    }

    //functions
    function mintTokens(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    function changePrice(uint256 newPrice) public onlyOwner {
        s_price = newPrice;
    }

    function changeNftAddress(address newNftAddress) public onlyOwner {
        s_nftAddress = newNftAddress;
    }

    function buyTokens(uint256 amount) public payable {
        require(msg.value >= (amount * s_price), "insufficient balance");
        (bool callSuccess, ) = payable(owner()).call{value: (amount * s_price)}(
            ""
        );
        require(callSuccess, "Call failed");
        _transfer(owner(), msg.sender, amount);
    }

    //getter functions

    function getPrice() public view returns (uint256) {
        return s_price;
    }

    function getNftAddress() public view returns (address) {
        return s_nftAddress;
    }

    function getTokenId() public view returns (uint256) {
        return s_tokenId;
    }

    receive() external payable {}
}
