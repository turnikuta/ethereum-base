pragma solidity ^0.5.0;

contract UnsignedInteger {

  function add(uint8 _plusOne, uint8 _plusTwo) public pure returns (uint8){
    return _plusOne + _plusTwo;
  }

  function sub(uint8 _minusOne, uint8 _minusTwo) public pure returns (uint8){
    return _minusOne - _minusTwo;
  }

}
