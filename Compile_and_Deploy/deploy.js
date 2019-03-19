//
// Script will deploy the compiled contracts found in the directory 'builds'
// to the Ganache Ethereum Network.
// The first (default) account in Ganache is used for the deployment.
// 
'use strict';

const fs = require('fs-extra');
const path = require('path');
const ethers = require('ethers');
const config = require('./deploy_config.js');

let provider = new ethers.providers.JsonRpcProvider({url: config.networks.ganache.url});
 
const buildDir = 'build';
const builds = {};

// get the contract JSON files created with compile.js
const readBuilds = () => {
  const buildFiles = fs.readdirSync(buildDir);

  buildFiles.forEach( file => {
    const buildPath = path.resolve(buildDir, file);
    builds[file] = {
      contents: JSON.stringify(fs.readJsonSync(buildPath))
    };
  });
}

// deploy all existing contracts
const deployContracts = () => {

  // deploy from the first account
  let signer = provider.getSigner(0); 

  for ( let build in builds) {
    let abicode = JSON.stringify(JSON.parse(builds[build].contents).abi);
    let bytecode = '0x' + JSON.parse(builds[build].contents).evm.bytecode.object;

    const factory = new ethers.ContractFactory(abicode, bytecode, signer);

    factory.deploy()
    .then( data => { 
      console.log(`Contract ${build}\n  deployed on address ${data.address}`);
    }, error => {
      console.error("Deployment failed!\n\n", error);
    });
  }
}

(function run (){
  readBuilds();
  deployContracts();
})();

