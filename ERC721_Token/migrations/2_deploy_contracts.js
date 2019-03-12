var ArtGallery = artifacts.require("./ArtGallery");

// the network name and web3.eth.getAccounts() is passed to the migrations
module.exports = function(deployer, network, accounts) {
  const _name = 'The Art Gallery Token';
  const _symbol = 'AGT';
  var owner = accounts[0];

  // set the sender address via config options
  deployer.deploy(ArtGallery, _name, _symbol, {from: owner})
};
