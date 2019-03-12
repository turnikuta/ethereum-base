pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract ABCFaucet {

  ERC20 public ABCToken;
  address public ABCOwner;

  constructor(address _ABCToken, address _ABCOwner) public {

    ABCToken = ERC20(_ABCToken);
    ABCOwner = _ABCOwner;
  }

  function withdraw(uint withdraw_amount) public {

    require(withdraw_amount <= 1000, "Not allowed - withdraw amount > 1000!!");

    ABCToken.transferFrom(ABCOwner, msg.sender, withdraw_amount);
  }
  
  // Reject any incoming ether
  function () external payable { revert("No incoming payment accepted!!"); }
}

