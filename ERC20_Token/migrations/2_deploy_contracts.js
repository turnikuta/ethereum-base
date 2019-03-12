var ABCToken = artifacts.require("./ABCToken.sol");
var ABCFaucet = artifacts.require("./ABCFaucet.sol");

// the network name and web3.eth.getAccounts() is passed to the migrations
module.exports = function(deployer, network, accounts) {
  const _name = 'ABC Ethereum Token';
  const _symbol = 'ABC';
  const _decimals = 2;
  var owner = accounts[0];

  // set the sender address via config options
  deployer.deploy(ABCToken, _name, _symbol, _decimals, {from: owner})
  .then( function() {
    return deployer.deploy(ABCFaucet, ABCToken.address, owner);
  });
};
