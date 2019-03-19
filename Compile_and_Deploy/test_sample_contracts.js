//
// Test the successful deployment of the sample contracts 
//  ./contracts/Hello.sol 
//  ./contracts/World.sol
//
'use strict';

const ethers = require('ethers');

if ( process.argv.length !== 4 ) {
  console.log("Parameter missing!\n");
  console.log("node test_sample_contracts.js <contractAddress1> <contractAddress2>");
  process.exit();
}

( async () => {
  const contractAddrHello = process.argv[2];
  const contractAddrWorld = process.argv[3];

  const abi = [ "function say() public pure returns (string memory)" ]

  const provider = new ethers.providers.JsonRpcProvider({url: "http://localhost:7545"});
  const signer = provider.getSigner(0);
  const contractHello = new ethers.Contract(contractAddrHello, abi, signer);
  const contractWorld = new ethers.Contract(contractAddrWorld, abi, signer);

  // calling the pure(constant) methods
  let x  = await contractHello.say();
  let y  = await contractWorld.say();
  console.log(x, y);
})()
.catch(err => console.log("\n\nFailure occured!\n\n" + err));
