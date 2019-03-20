# What it is?
The Ethereum Virtual Machine specifies fixed-size data types for integer. This means, that an integer variable can represent only a certain range of numbers. If care is not taken, variables in Solidity can be exploited if user input is unchecked and calculations are performed that result in numbers, that lie outside the range of the data type that stores them.

This application demonstrates the problem of arithmetic overflow and underflow.
 
The application allows the addition and subtraction of signed and unsigned integer values and shows how overflow and underflow occur.

It is based on
- [Ganache](https://www.truffleframework.com/ganache)
- [ethers.js](https://github.com/ethers-io/ethers.js/)
- [truffle](https://www.truffleframework.com/truffle) [optional]



## Installation

##### Ethereum Blockchain
[Download](https://www.truffleframework.com/ganache) the Ganache AppImage (and make it executable)

> The URL used to connect to Ganache is `http://localhost:7545`. 
> 
>This can be adjusted in the application config file `ganache-config.js`
>and in truffle configuration file `truffle-config.js`


##### Compile and Deploy 
The application is prepared to use Truffle, but you can also use a tool of your choice.

Install the Truffle Development Framework 
* `npm -g install truffle`

Deploy the contracts 
* `truffle compile`
* `truffle migrate`

**Note:** Please record the addresses of the generated contracts, they are required in the application.

## Explore

Start your Browser and open the file `index.html`



