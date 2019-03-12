
var ArtGallery = artifacts.require("./ArtGallery");

module.exports = async function (callback) {
  let _instanceA = await ArtGallery.deployed();

  let _totalSupply= await _instanceA.totalSupply();
  console.log(`There are ${_totalSupply} tokens  minted:`);
  for ( i = 0; i < _totalSupply; i++ ) {
    let _mintedToken =  await _instanceA.tokenByIndex(i);
    console.log(`-> ${_mintedToken}`);
  }
}

/*
----  expected result

~/work/ERC721_Token$ npx truffle exec get_list_of_tokens.js 
Using network 'development'.

There are 2 tokens  minted:
-> 1000
-> 1001

*/
