// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Image_NFT_MarketPlace is ERC721("DAppFi", "DAPP"), Ownable {
    string public NTF_Storage_Link =
        "https://bafybeiaarrkflari2ed5n43sm45zjfqizuminzridsrvetbyxe4kx4fjfi.ipfs.nftstorage.link/";
    string public followed_Extension = ".json"; /* file extension of metadata*/
    address public art_maker; /* account where artist fees will be paid*/
    uint256 public artist_fees; /* amount of artist fees*/

    struct Image {   /* to save metadata of images like image ID, address of the seller, price at which it will be sold*/
        uint256 tokenId;
        address payable seller;
        uint256 price;
    }
    Image[] public images;

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

    /* In constructor we initalize artist fee, art_maker address and prices of music nfts*/
    constructor(
        uint256 _artist_fees,
        address _art_maker,
        uint256[] memory _prices
    ) payable {
        require(
            _prices.length * _artist_fees <= msg.value,  /* deployer must send artist fees to art_maker as it selling art_maker's art on market place and gas sent by owner while deploying the contarct must be number of images X artist fee*/
            "Deployer must pay artist fee for each token listed on the marketplace"
        );
        artist_fees = _artist_fees;
        art_maker = _art_maker;
        for (uint8 i = 0; i < _prices.length; i++) {
            require(_prices[i] > 0, "Price must be greater than 0");
            _mint(address(this), i);  /* this function is inheritaed from ERC721 contact creats NFT of image*/
            images.push(Image(i, payable(msg.sender), _prices[i])); /* pushing the NFT/image into struct*/
        }
    }

    /* Updates the artist fee of the contract : only by manager */
    function updateartist_fees(uint256 _artist_fees) external onlyOwner {
        artist_fees = _artist_fees;
    }

    /* Creates the sale of a image nft listed on the marketplace */
    /* Transfers ownership of the nft, as well as funds between parties */
    function buyImage(uint256 _tokenId) external payable {
        uint256 price = images[_tokenId].price;
        address seller = images[_tokenId].seller;
        require(
            msg.value == price,
            "Please send the asking price in order to complete the purchase"
        );
        images[_tokenId].seller = payable(address(0)); /* setting seller's address for that NFT to zero as no one is selling it and That NFT is sold*/
        _transfer(address(this), msg.sender, _tokenId); /* this function is inheritaed from ERC721 contact transfers NFT , now it tranfering NFT from contract to buyer*/
        payable(art_maker).transfer(artist_fees);
        payable(seller).transfer(msg.value);
        emit ImageBought(_tokenId, seller, msg.sender, price); /* this event will log details of purchase on block in blockchain and tells NFT is moved from contract to buyer*/
    }

    /* Allows someone to resell their image nft */
    function resellImage(uint256 _tokenId, uint256 _price) external payable {
        require(msg.value == artist_fees, "Must pay royalty"); /* here user must pay artist_fees before putting any NFT on sell*/
        require(_price > 0, "Price must be greater than zero");
        images[_tokenId].price = _price; /* user deciding new price of the NFT*/
        images[_tokenId].seller = payable(msg.sender); /* user */

        _transfer(msg.sender, address(this), _tokenId); /* transfers NFT from user/seller to contract 58:40*/
        emit ImageRelisted(_tokenId, msg.sender, _price); /* this event will log details of purchase on block in blockchain and tells NFT is moved from user/seller to contarct*/
    }

    /* Fetches all the images currently listed for sale on market place (those are belong to contract: tokens which hasn't been sold not even once and tokens which are put on the sell by users*/
    function getAllUnsoldImages() external view returns (Image[] memory) {
        uint256 unsoldCount = balanceOf(address(this));
        Image[] memory tokens = new Image[](unsoldCount);
        uint256 currentIndex;
        for (uint256 i = 0; i < images.length; i++) {
            if (images[i].seller != address(0)) {
                tokens[currentIndex] = images[i];
                currentIndex++;
            }
        }
        return (tokens);
    }

    /* Fetches all the images owned by the user and not listed on marketplace/contact to sell*/
    function getMyImages() external view returns (Image[] memory) {
        uint256 myTokenCount = balanceOf(msg.sender);
        Image[] memory tokens = new Image[](myTokenCount);
        uint256 currentIndex;
        for (uint256 i = 0; i < images.length; i++) {
            if (ownerOf(i) == msg.sender) {
                tokens[currentIndex] = images[i];
                currentIndex++;
            }
        }
        return (tokens);
    }

    /* Internal function that gets the NTF_Storage_Link initialized in the constructor */
    //function _NTF_Storage_Link() internal view virtual override returns (string memory) {
        //return NTF_Storage_Link;
    //}
}
