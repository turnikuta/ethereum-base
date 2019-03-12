
//
// Scenario:
//  Alice is the owner of the contract and the minter of the NFT
//  Bob is the owner of the minted Tokens
//  Charlie is approved to transfer the tokens to Dick 
// 

var ArtGallery = artifacts.require("./ArtGallery");

module.exports = async function (callback) {
  let _instanceA = await ArtGallery.deployed();

  let accounts = await web3.eth.getAccounts(); 
  let alice = accounts[0];
  let bob = accounts[1];
  let charlie = accounts[2];
  let dick = accounts[3];

  let user = {
    [alice]: "Alice",
    [bob]: "Bob",
    [charlie]: "Charlie",
    [dick]: "Dick",
  }

  // Get the ID of the Token/Deed to be transfered
  let _defaultId = 1000
  let _token = process.argv[4] ? process.argv[4] : _defaultId;

  // Check if token already exists
  //
  //   let _ownerExists = await _instanceA.ownerOf(_token);
  //
  //   This simple check cannot be performed due to problem 
  //     https://github.com/ethereum/web3.js/issues/1916
  // 
  // Use this workaround
  let _used = false;
  let _totalSupply= await _instanceA.totalSupply();
  for ( i = 0; i < _totalSupply; i++ ) {
    let _mintedToken = await _instanceA.tokenByIndex(i);
    if ( _mintedToken == _token ) {  // compares BN object with number
      _used = true;
    }
  }
  if ( ! _used ) {
    console.log(`Token ${_token} does not exist!`);
    return;
  }

  // bob (the owner) approves charlie
  console.log(`${user[bob]} approves ${user[charlie]} for token ${_token}`);
  await _instanceA.approve(charlie, _token, {from: bob});

  // get approved address for the token
  let _addrApproved = await _instanceA.getApproved(_token);
  console.log(`Approved for token ${_token} is ${user[_addrApproved]}`);

  // Transfer token
  console.log("Transfer token ...");
  await _instanceA.safeTransferFrom(bob, dick, _token, {from: charlie});
  console.log(`Token ${_token} transfered from ${user[bob]} to ${user[dick]} by ${user[charlie]}`);
  // ...the approval for charlie will be removed

  // Check the ownership of the token
  let _ownerToken = await _instanceA.ownerOf(_token);
  console.log(`Owner of token ${_token} is ${user[_ownerToken]}`);

}

/*
----  expected result

~/work/ERC721_Token$ npx truffle exec approve_and_transfer_token.js 1000
Using network 'development'.

Bob approves Charlie for token 1000
Approved for token 1000 is Charlie
Transfer token ...
Token 1000 transfered from Bob to Dick by Charlie
Owner of token 1000 is Dick

*/
