## What it is?
Create an ERC-20 fungible token and play around with it...

It is based on
- Truffle https://www.truffleframework.com/truffle
- OpenZeppelin https://www.npmjs.com/package/openzeppelin-solidity
- Ganache  https://www.truffleframework.com/ganache

If you want to use Ropsten or any other ethereum network, just modify `truffle-config.js`

## Installation

Install the Node.js Dependencies

`npm -l install`

Download the Ganache AppImage  (and make it executable)


https://www.truffleframework.com/ganache

## Explore

Start Ganache AppImage

`npx truffle compile`

`npx truffle migrate`

Run the truffle scripts with
`npx truffle exec <script>`

1. get_token_info.js

uses the optional functions of the ERC-20 standard to retrieve some infos about the token  

2. approve_transferFrom.js

sample two-step approve & transferFrom workflow of the ERC-20 token

3. gas_estimates.js


sample gas estimation for the 'withdraw' function

