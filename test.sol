pragma solidity ^0.8.10;

contract Payable {

    address public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function payment() external payable {
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether");
    }

}