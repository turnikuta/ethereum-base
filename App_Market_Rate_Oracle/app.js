const Abicode = require('./build/contracts/MarketRate.json').abi;

const CONFIG = './app-config.json';
const config = require(CONFIG);

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.network_config.websocket));

const updateInterval = config.update_interval * 1000;

process.on('SIGINT', cleanup.bind());

function cleanup(){
  clearInterval(timer); 
  web3.currentProvider.connection.close();
}

function formattedDate(epoch){
  let date = new Date(parseInt(epoch));

  let options = {
    day:'2-digit', month:'2-digit', year:'numeric',
    hour:'2-digit', minute:'2-digit', second:'2-digit',
    formatMatcher:'best fit'
  } 
  return( date.toLocaleString('de-DE', options) );
}

function getData(status){
  web3.eth.getAccounts()
  .then( accounts => {
    // Account 1 is NOT the owner of the contract
    let account = accounts[1];
  
    // Create contract object
    let contract = new web3.eth.Contract(Abicode);
  
    // Prepare function calls
    let abiGet = contract.methods.getEthRate().encodeABI();
    let abiUpdate = contract.methods.updateEthRate().encodeABI();
  
    // Get contract data
    web3.eth.call({
      to: config.contract_address,
      data: abiGet
    })
    .then( data => {
      let dataEthRate = web3.eth.abi.decodeParameter('string', data);
      // dataEthRate format: <epoch-timestamp>:<value>
      let [timestamp, value]  = dataEthRate.split(':');

      // Show the received data
      if (status !== "init") {
        console.log(formattedDate(timestamp) + ' ==> ' + value + ' EUR');
      }
  
      // Trigger update event
      web3.eth.sendTransaction({
        from: account,
        to: config.contract_address,
        data: abiUpdate,
        gas: 50000
      })
      .catch( (err) => console.error("sendTransaction failed!\n\n", err) );
    })
  })
  .catch( (err) => console.error("getAccounts failed!\n\n", err) );
}

console.log(`Oraclize ETH Market Rate (Update every ${updateInterval/1000} seconds)`);
getData("init");
let timer = setInterval( function() { getData(); }, updateInterval);
