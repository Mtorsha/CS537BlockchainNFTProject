// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract ClickStore {
    address public manager;    //manager
    uint256 numImage;   //image counter

    struct Image {                    //create struct Image 
        address payable Art_maker;          //the address for the original photographer
        uint256 NFT_number;       //NFT number, will be incremented by 1
        address payable owner;            //holder of the Image
        uint256 price;              //set price of Image to sell
        string NTF_Storage_Link;     //link of NFT
        uint256 artist_fees;         //the price for resell
        bool sell_complete;          //status for complete
        bool sell_resell;            //status for resell
    }

    Image [] images;     //array for storing every image
    Image [] sold_images;     //array for storing every image
    Image [] resell_images;     //array for storing every image
    mapping(uint256 => bool) public sold;  //mapping for storing sold or not
    mapping(uint256 => bool) public resell;  //mapping for storing resell or not

    //initialize the manager in the constructor
    constructor()  {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only the campaign manager can call this function."
        );
        _;
    }

    function createImage(uint256 price_set, string memory link) public payable  {
       // require ((0 < price_set), "Price should be more than minimum");
        Image memory newImage;
        newImage.Art_maker =  payable(msg.sender);
        newImage.NFT_number;
        newImage.owner = payable(msg.sender);
        newImage.price = price_set*(1 ether);
        newImage.NTF_Storage_Link = link;
        newImage.artist_fees = 0;
        newImage.sell_complete = false;
        newImage.sell_resell = false;
    }

    function Update_artist_part(uint256 index, string memory link, uint256 fee) public {
        require(msg.sender==images[index].Art_maker, "Only the art_maker can change the content");
        images[index].NTF_Storage_Link = link;
        images[index].artist_fees = fee; 
    }

    function Buy_Image(uint256 index) public payable {
        require(images[index].price <= msg.value, "the amount of paymen should be more than the price tag");
        require(images[index].sell_complete == false, "the resell status should be false");
        images[index].sell_complete = true;  //set complete status as true
        images[index].owner = payable(msg.sender);   //set image owner as the buyer
        sold[index] = true;    //set sold mapping as true
        sold_images.push(images[index]);  //add Image to sold array
    }

    function Resell_Image(uint256 index) public payable {
        require(images[index].sell_resell == false, "the resell status should be false");
        images[index].sell_resell = true;  //set resell status as true
        images[index].sell_complete = false;  //set complete status as false
        images[index].price = msg.value;   //set value 
        delete sold[index]; //deleteing image from sold mapping
        delete sold_images[index]; //deleting image from sold array
        resell[index] = true;  //set resell mapping as true
        resell_images.push(images[index]);  //add Image to resell array
    }

    function List_Image() public view returns (Image [] memory) {
        return images;
    }

    function List_Sold() public view returns (Image [] memory) {
        return sold_images;
    }

    function List_Resell() public view returns (Image [] memory) {
        return resell_images;
    }
}

