
var FaucetContract = artifacts.require("./ABCFaucet.sol");

module.exports = function(callback) {
  FaucetContract.web3.eth.getGasPrice()
  .then( result => {
    var gasPrice = Number(result);
    console.log("gas price is " + gasPrice + " wei");

    FaucetContract.deployed()
    .then( FaucetDeployed => {
      return FaucetDeployed.withdraw.estimateGas(web3.utils.toWei('0.000000000000001', 'ether'))
    })
    .then( estGas => {
      let gasCost = estGas * gasPrice;
      console.log("gas estimation (for withdraw ) = " + estGas + " units");
      console.log("gas cost estimation (gas estimation * gas price) = " + gasCost + " wei");
      console.log("gas cost estimation = " + FaucetContract.web3.utils.fromWei(String(gasCost), 'ether') + " ether");
    })
  });
}

/*

---- expected output
~/work/ERC20_Token$ npx truffle exec gas_estimates.js 
Using network 'development'.

gas price is 20000000000 wei
gas estimation (for withdraw ) = 40429 units
gas cost estimation (gas estimation * gas price) = 808580000000000 wei
gas cost estimation = 0.00080858 ether

*/
