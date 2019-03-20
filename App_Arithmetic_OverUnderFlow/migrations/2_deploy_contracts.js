var signedInteger = artifacts.require("./SignedInteger");
var unsignedInteger = artifacts.require("./UnsignedInteger");

module.exports = function(deployer) {
  deployer.deploy(signedInteger);
  deployer.deploy(unsignedInteger);
};
