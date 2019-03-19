//
// Script will compile all Solidity Contracts found in the directory 'contracts'.
// The compilation artifacts are stored in the directory 'builds'.
// Only the components [abi, bytecode] required for the deployment of the contracts are generated.
//

'use strict';

const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const buildDir = 'build';
const contractDir = 'contracts';

// create target folder for the compiler artifacts
const createBuildFolder = () => { fs.emptyDirSync(buildDir) };

// get all existing contracts
const buildSources = () => {

  const sources = {};
  const contractFiles = fs.readdirSync(contractDir);
  
  contractFiles.forEach(file => {
    const contractPath = path.resolve(contractDir, file);
    sources[file] = {
      content: fs.readFileSync(contractPath, 'utf8')
    };
  });
  
  return sources;
}

// create compiler input
const input = {
  language: 'Solidity',
  sources: buildSources(),
  settings: {
    outputSelection: {
      '*': {
        '*': [ 'abi', 'evm.bytecode' ]
      }
    }
  }
}

// compile all contracts
const compileContracts = () => {

  let compiled = JSON.parse(solc.compile(JSON.stringify(input)));
  if (!compiled) {
      console.log("\n\n--- Compilation Error ---\n\nNo Output");
      process.exit;
  } else if (compiled.errors) {
      console.log("\n\n--- Compilation Error ---\n\n");
      compiled.errors.map(error => console.log(error.formattedMessage));
      process.exit;
  }

  const compiledContracts = compiled.contracts;

  for (let contract in compiledContracts) {
    console.log(`${contract} compiled`);

    // all artifacts of the compilation are written to the build directory
    for(let contractName in compiledContracts[contract]) {
      fs.outputJsonSync(
        path.resolve(buildDir, `${contractName}.json`),
        compiledContracts[contract][contractName],
        {
          spaces: 2
        }	
      )
    }
  }
}

(function run () {
  createBuildFolder();
  compileContracts();
})()
