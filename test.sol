pragma solidity ^0.8.10;

contract Payable {

    address public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function payment(string memory _id) public payable returns (string memory){
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether");
        return _id;
    }

}