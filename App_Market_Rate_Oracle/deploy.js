const fs = require('fs');
const abiCode = require('./build/contracts/MarketRate.json').abi;
const byteCode = require('./build/contracts/MarketRate.json').bytecode;

const CONFIG = './app-config.json';
const config = require(CONFIG);

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.network_config.websocket));

function cleanup(){
  web3.currentProvider.connection.close();
}

function modify_config(contract){
  config.contract_address = contract;
  json_object = JSON.stringify(config, null, 2);
  
  fs.writeFile(CONFIG, json_object, 'utf8', function (err) {
    if (err) {
        console.error("Write to configuration file failed!\n\n", err);
        return;
    }
    console.log("Contract address added to configuration file!");
  });
}

web3.eth.getAccounts()
.then( accounts => {
  // Account 0 is the owner of the contract
  let account = accounts[0];

  // Create contract object
  let contract = new web3.eth.Contract(abiCode);

  // Deploy contract (expected gas usage = 496917)
  contract.deploy({data: byteCode})
  .send({from: account, gas: 600000 , gasPrice: '20000000000'})
  .on('error', (err) => { console.error("Deploy contract failed!\n\n", err) })
  .then((contractInstance) => {
    cleanup(); 
    console.log("Contract created at address: ", contractInstance.options.address);
    modify_config(contractInstance.options.address);
  })
})
.catch( (err) => console.error("getAccounts failed!\n\n", err) );
