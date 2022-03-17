pragma solidity ^0.8.10;

contract Payable {

    address public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    event sendDataBack(string id, address _sender);

    function payment(string memory _id) external payable {
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether");
        emit sendDataBack(_id, msg.sender);
    }

}