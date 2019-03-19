## What it is?
Compile and deploy your Solidity Smart Contracts with your own scripts.

The deployment is based on
- ethers.js  https://github.com/ethers-io/ethers.js

The scripts will compile and deploy all contracts found in the `./contracts` directory to the Ganache network.
There are 2 sample contracts available ("Hello.sol", "World.sol").

The Default URL `http://localhost:7545` is customizable in the file `deploy_config.js`.


## Installation

Install the Node.js Dependencies

`npm -l install`

[Download](http://www.truffleframework.com/ganache) the Ganache AppImage  (and make it executable) 

## Explore

1. Start Ganache AppImage

2. Compile the sample contracts
```
~/Compile_and:Deploy$ node compile.js
Hello.sol compiled
World.sol compiled
```

3. Deploy the sample contracts
```
~/Compile_and:Deploy$ node deploy.js
Contract Hello.json
  deployed on address 0x585aB3ABb0ff1705FF8A533E702D1F1A46A792A8
Contract World.json
  deployed on address 0x02F073e97B061FebfA15E13051F0aCA448a5475d
```

4. Call the methods of the sample contracts
```
~/Compile_and:Deploy$ node test_sample_contracts.js \
      0x585aB3ABb0ff1705FF8A533E702D1F1A46A792A8    \
      0x02F073e97B061FebfA15E13051F0aCA448a5475d
Hello World
```





