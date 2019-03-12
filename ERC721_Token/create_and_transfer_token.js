
//
// Scenario:
//  Alice is the owner of the contract and the minter of the NFT
//  Alice transfers the minted tokens to Bob
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

  let nft = new Map();

  // Check if alice is minter 
  let _mint = await _instanceA.isMinter(alice)
  if (!_mint) {
    console.log(`${user[alice]} is NOT a minter!\n`)
    return;
  }

  // Get the ID of the Token/Deed to be minted
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
    let _tokenOwner = await _instanceA.ownerOf(_mintedToken);
    nft.set(_mintedToken.toString(), user[_tokenOwner]);
  }
  if ( _used ) {
    console.log(`Token ${_token} already exists!`);
    console.log("The following tokens are already minted:");
    for (const entry of nft.entries()) {
      console.log(entry);
    }
    return;
  }

  // Mint the token
  console.log("Mint token ...");
  let _result = await _instanceA.mint(alice, _token);
  console.log(`Token ${_token} minted by ${user[alice]}`);
  //console.log(_result.logs[0].event, _result.logs[0].args);
  _totalSupply++;

  // Transfer token
  console.log("Transfer token ...");
  await _instanceA.safeTransferFrom(alice, bob, _token);
  console.log(`Token ${_token} transfered from ${user[alice]} to ${user[bob]}\n`);

  // Check new owner and adjust mapping of token ownership
  let _newTokenOwner = await _instanceA.ownerOf(_token);
  nft.set(_token, user[_newTokenOwner]);

  console.log("The following tokens are managed by the ArtGallery Contract:");
  for ( i = 0; i < _totalSupply; i++)  {
    let _mintedToken =  await _instanceA.tokenByIndex(i);
    let _tokenOwner = await _instanceA.ownerOf(_mintedToken);
    console.log(`${_mintedToken} -> ${user[_tokenOwner]}`);
  }
  
}

/*
----  expected result

~/work/ERC721_Token$ npx truffle exec create_and_transfer_token.js 1000
Using network 'development'.

Mint token ...
Token 1000 minted by Alice
Transfer token ...
Token 1000 transfered from Alice to Bob

The following tokens are managed by the ArtGallery Contract:
1000 -> Bob

*/
