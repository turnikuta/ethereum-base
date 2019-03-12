pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol';

// ERC20Detailed.sol
//   IERC20.sol
// ERC20Capped.sol
//   ERC20Mintable.sol
//     ERC20.sol
//       IERC20.sol


contract ABCToken is ERC20Capped, ERC20Detailed {
  uint private _initial_supply = 620000000;

  constructor(string memory _name, string memory _symbol, uint8 _decimals) 
    ERC20Capped(_initial_supply)
    ERC20Detailed(_name, _symbol, _decimals) public {

    mint(msg.sender, _initial_supply);
  }
}

