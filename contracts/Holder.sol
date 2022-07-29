// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Holder {
    mapping(address => uint256) public _accounts;

    function payFor(address account) external payable {
        _accounts[account] += msg.value;
    }

    function withdrawTo(address payable dest) external payable {
        require(_accounts[msg.sender] > 0, "Holder: balance must be > 0");
        dest.transfer(_accounts[msg.sender]);
    }
}
