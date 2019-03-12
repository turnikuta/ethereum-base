
var ArtGallery = artifacts.require("./ArtGallery");

module.exports = async function (callback) {
  let _instanceA = await ArtGallery.deployed();

  let _name = await _instanceA.name();
  let _symbol = await _instanceA.symbol(); 
  console.log(`Name: ${_name}\nSymbol: ${_symbol}\n`)
}

/*
----  expected result

~/work/ERC721_Token$ npx truffle exec get_meta_info.js 
Using network 'development'.

Name: The Art Gallery Token
Symbol: AGT

*/
