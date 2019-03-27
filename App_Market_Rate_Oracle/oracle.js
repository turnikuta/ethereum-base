const abiCode = require('./build/contracts/MarketRate.json').abi;
const fetchUrl = require("fetch").fetchUrl;

const CONFIG = './app-config.json';
const config = require(CONFIG);

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.network_config.websocket));

function cleanup(){
  web3.currentProvider.connection.close();
}
process.on('SIGINT', cleanup.bind());

web3.eth.getAccounts()
.then( accounts => {
  // Account 0 is the owner of the contract
  // Only the owner is allowed to update the contract 
  let account = accounts[0];

  // Create contract object
  let contract = new web3.eth.Contract(abiCode);

  // Wait for event
  contract.events.UpdateRateEvent({fromBlock: "latest"})
  .on('data', (event) => {
    if (event.event === "UpdateRateEvent" ) {
    console.log(`${event.event} received at ${Date()}`);

      // Get data from external provider
      fetchUrl('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR&e=kraken', (err, meta, body ) => {

        let newRate;
        if ( meta.status === 200 ) {
          newRate=JSON.parse(body.toString()).EUR; 
        } else {
          newRate="failed";
        }
        newRate = Date.now() + ':' + newRate;
  
        // Prepare function call
        let abi = contract.methods.setEthRate(newRate).encodeABI();
  
        // Update contract data
        web3.eth.sendTransaction({
          from: account,
          to: config.contract_address,
          data: abi,
          gas: 50000
        })
        .catch( (err) => console.error("sendTransaction failed!\n\n", err) );
      })
    }
  })
  .on('error', (error) => {
    console.error("eventSubscription failed!\n\n", error);
  })

})
.catch( (err) => console.error("getAccounts failed!\n\n", err) );


