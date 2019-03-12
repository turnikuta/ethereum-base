
var TokenContract = artifacts.require("./ABCToken.sol");
var FaucetContract = artifacts.require("./ABCFaucet.sol");

module.exports = async function (callback) {
  let _instanceT = await TokenContract.deployed();
  let _instanceF = await FaucetContract.deployed();

  // get List of Accounts
  // account[0] - Token Owner
  // account[1] - Token Requester
  let accounts = await web3.eth.getAccounts();

  // Check: how many tokens are actually approved?
  let allowance = await _instanceT.allowance(accounts[0], FaucetContract.address);
  if ( allowance.toString() == "0" ){
    // approve Faucet Contract 100000 ABC Token
    console.log("Approve 100000 to Faucet Contract ...");
    await _instanceT.approve(FaucetContract.address, 100000); 
  }

  // Check: how many tokens are actually approved?
  allowance = await _instanceT.allowance(accounts[0], FaucetContract.address);
  console.log("Allowance: ", allowance.toString());

  // withdraw request 
  console.log("Withdraw Request 1000 ...");
  await _instanceF.withdraw(1000, {from: accounts[1]});

  // get balances
  let balanceOwner = await _instanceT.balanceOf(accounts[0]);
  let balanceRequester = await _instanceT.balanceOf(accounts[1]);
  console.log(`Balance Owner: ${balanceOwner}\nBalance Requester: ${balanceRequester}`);

  // how many tokens can the contract still award
  allowance = await _instanceT.allowance(accounts[0], FaucetContract.address);
  console.log("Remaining Allowance: ", allowance.toString());
}

/*

----  expected result

~/work/ERC20_Token$ npx truffle exec approve_transferFrom.js
Using network 'development'.

Approve 100000 to Faucet Contract ...
Allowance:  100000
Withdraw Request 1000 ...
Balance Owner: 619999000
Balance Requester: 1000
Remaining Allowance:  99000

~/work/ERC20_Token$ npx truffle exec approve_transferFrom.js
Using network 'development'.

Allowance:  99000
Withdraw Request 1000 ...
Balance Owner: 619998000
Balance Requester: 2000
Remaining Allowance:  98000

~/work/ERC20_Token$ npx truffle exec approve_transferFrom.js
Using network 'development'.

Allowance:  98000
Withdraw Request 1000 ...
Balance Owner: 619997000
Balance Requester: 3000
Remaining Allowance:  97000

*/
