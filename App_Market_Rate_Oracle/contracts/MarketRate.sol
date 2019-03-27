pragma solidity ^0.5.0;

contract MarketRate {

  address public owner;
  string public ethRate;

  event UpdateRateEvent();

  constructor() public {
    owner = msg.sender;
  }

  function updateEthRate() public {
    emit UpdateRateEvent();
  }

  function setEthRate(string memory rate) public {
    require(msg.sender == owner, "Only the owner is allowed to change the state of the contract");
    ethRate = rate;
  }

  function getEthRate() public view returns (string memory) {
    return ethRate;
  }
}
