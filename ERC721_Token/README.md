## What it is?
Create an ERC-721 non-fungible token (NFT) and play around with it...

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
`npx truffle exec <script> [<param>]`

1. get_meta_info.js

uses the optional functions of the ERC-721 standard to retrieve some infos about the non-fungible token 

2. create_and_transfer_token.js 

sample two-step mint & transferFrom workflow of the ERC-721 token (`<param> = token-id`)

3. approve_and_transfer_token.js

sample two-step approve & transferFrom workflow of the ERC-721 token (`<param> = token-id`)

4. get_list_of_tokens.js

get the list of NFT already minted 

