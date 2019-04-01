
# What it is?
This simple Ethereum application demonstrates the usage of an oracle, to provide external data sources to Ethereum smart contracts.

It is based on
- [Ganache](https://www.truffleframework.com/ganache)
- [web3.js](https://github.com/ethereum/web3.js)

# Installation

Install the Node.js Dependencies

`npm -l install`

[Download](https://www.truffleframework.com/ganache) the Ganache AppImage (and make it executable)

> The URL used to connect to Ganache is `http://localhost:7545`.
> 
>This can be adjusted in the application config file `app-config.js`

#### Note:
I had to use web3 Version 1.0.0-beta.46, because earlier and later beta versions didn't work (see [here](https://github.com/ethereum/web3.js/issues/2601))


# Explore

1. deploy the contract
```
~/App_Market_Rate_Oracle$ node deploy.js
Contract created at address:  0x1c2e3a87f3950f6fde6d247ca9102d7b5cec6b49
Contract address added to configuration file!
```

2. start the oracle
```
~/App_Market_Rate_Oracle$ node oracle.js
```
> *When the application is running you can see the incoming events*
> ```
> UpdateRateEvent received at Wed Mar 27 2019 13:08:57 GMT+0100 (Central European Standard Time)
> UpdateRateEvent received at Wed Mar 27 2019 13:09:57 GMT+0100 (Central European Standard Time)
>```

3. start the application
```
~/App_Market_Rate_Oracle$ node app.js
Oraclize ETH Market Rate (Update every 60 seconds)
03/27/2019, 1:08:57 PM ==>  122.54 EUR
03/27/2019, 1:09:57 PM ==>  122.55 EUR
```



