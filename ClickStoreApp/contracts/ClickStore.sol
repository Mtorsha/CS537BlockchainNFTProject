// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Image_NFT_MarketPlace is ERC721("DAppFi", "DAPP"), ERC721URIStorage, Ownable {
    address payable[] public artist; /*account where artist fees will be paid*/
    mapping(address => uint256) public artist_fees; /* amount of artist fees*/
    address payable public manager;
    struct Image {   /* to save metadata of images like image ID, address of the seller, price at which it will be sold*/
        uint256 tokenId;
        address payable seller;
        uint256 price;
        string uri;
    }
    Image[] public images;

    uint256 tokenCounter;

    event ImageBought(
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        uint256 price
    );

    event ImageRelisted(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    constructor() {
        manager = payable(msg.sender);
    }

    function registerArt(address _artist,uint256 _artist_fees,uint256 price, string memory uri) public payable{
        require(
           price>0,
           "Price must be greater than 0"
        );
        require(
            msg.value >= _artist_fees,  /* deployer must send artist fees to art_maker as it selling art_maker's art on market place and gas sent by owner while deploying the contarct must be number of images X artist fee*/
            "Manager must pay artist fee for each token listed on the marketplace"
        );
        artist.push(payable(_artist));
        artist_fees[_artist] = _artist_fees;
        images.push(Image(tokenCounter, manager, price,uri)); /* pushing the NFT/image into struct*/
        _safeMint(_artist, tokenCounter);
        _setTokenURI(tokenCounter, uri);
        tokenCounter++;
    }

    function buyImage(uint256 tokenId) public payable {
        uint256 price = images[tokenId].price;
        address seller = images[tokenId].seller;
        require(
            seller!=payable(address(0)),
            "NFT not for sale"
        );
        require(
            msg.value >= price,
            "Please send the asking price in order to complete the purchase"
        );
        images[tokenId].seller = payable(address(0)); /* setting seller's address for that NFT to zero as no one is selling it and That NFT is sold*/
        _transfer(artist[tokenId], msg.sender, tokenId); /* this function is inheritaed from ERC721 contact transfers NFT , now it tranfering NFT from contract to buyer*/
        artist[tokenId].transfer(artist_fees[artist[tokenId]]*1000000000000000000.0);
        payable(seller).transfer(msg.value);
        emit ImageBought(tokenId, images[tokenId].seller, msg.sender, price); /* this event will log details of purchase on block in blockchain and tells NFT is moved from contract to buyer*/
    }

    function resellImage(uint256 tokenId, uint256 _price) public payable {
        require(msg.value == artist_fees[artist[tokenId]]*1000000000000000000.0, "Must pay royalty"); /* here user must pay artist_fees before putting any NFT on sell*/
        require(_price > 0, "Price must be greater than zero");
        images[tokenId].price = _price; /* user deciding new price of the NFT*/
        images[tokenId].seller = payable(msg.sender); /* user */
        // _transfer(msg.sender, address(this), tokenId); /* transfers NFT from user/seller to contract 58:40*/
        emit ImageRelisted(tokenId, msg.sender, _price); /* this event will log details of purchase on block in blockchain and tells NFT is moved from user/seller to contarct*/
    }

    /*The following functions are overrides required by Solidity. Have no impact.*/
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
        {
        return super.tokenURI(tokenId);

    }

}
