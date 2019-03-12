
var TokenContract = artifacts.require("./ABCToken.sol");

module.exports = async function (callback) {
  let _instance = await TokenContract.deployed();
  let _name = await _instance.name();
  let _symbol = await _instance.symbol();
  let _decimals = await _instance.decimals();
  let _totalSupply = await _instance.totalSupply();
  console.log(`Name: ${_name}\nSymbol: ${_symbol}\nDecimals: ${_decimals}\nTotal Supply: ${_totalSupply}`);
}

/*

---- expected result

~/work/ERC20_Token$ npx truffle exec get_token_info.js
Using network 'development'.

Name: ABC Ethereum Token
Symbol: ABC
Decimals: 2
Total Supply: 620000000

*/
