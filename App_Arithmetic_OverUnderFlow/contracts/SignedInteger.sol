pragma solidity ^0.5.0;

contract SignedInteger {

  function add(int8 _plusOne, int8 _plusTwo) public pure returns (int8){
    return _plusOne + _plusTwo;
  }

  function sub(int8 _minusOne, int8 _minusTwo) public pure returns (int8){
    return _minusOne - _minusTwo;
  }

}

