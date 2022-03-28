# XC Pass for XC Labs
![XC Labs](/src/assets/header-logo2.png)

## Overview

This is the repository for **XC Labs'** website, a chain-agnostic NFT laboratory. We want to build and scale the next generation of phygital assets.

As part of this project, we released **XC Pass** which is our early access token to investors for our future projects. This token is an ERC-721 NFT on the Avalanche Network.

You can check the live contract here: [XC Pass ERC-721 Contract](https://snowtrace.io/address/0x96E29d3c0dE3B26ab6cf3dEa70a8415123d766dE)

![XC Pass](/src/assets/xcpass-logo.png)

![XC Pass](/public/social.jpg)

Web3 integration with the Avalanche network was done using Moralis SDK and Speedy Nodes.

## Setup & Deployment

1. To be able to launch the project, first you need to create a **Moralis** account. In that account, create a new server (it can be testnet or mainnet on any EVM compatible blockchain). Once the server is created, access the server info and look for the following values: **SERVER URL** and **APP ID**. 

2. Create a ***.env*** file in the root of this folder with the following structure:

        REACT_APP_MORALIS_APPLICATION_ID = **APP ID**
        REACT_APP_MORALIS_SERVER_URL = **SERVER URL**

3. To install all dependencies, run your package manager:

        //Using npm
        $> npm install

        //Using yarn
        $> yarn install 

4. Test if everything works fine so far by running:

        $> npm start

If everything is working fine you should see the website open without errors.

5. By now, you should consider deploying your own contract. There are some example contracts in the ***/src/contracts/*** folder. Once your contract is deployed you have to change the contract address and some other values in ***/src/index.js***. 

## Components & Hooks
Inside the ***/src/components/*** folder are all React components. The goal is to make them all as modular, reusable and independent as possible.
Components still need to be separated into Pages and reusable functional components.

To check a list of all available Hooks provided by Moralis, go here: [Moralis Documentation](https://docs.moralis.io/introduction/readme)

## Credits
- Made with [React](https://reactjs.org/)
- UI: [Ant Design](https://ant.design/)
- Web3 SDK + Backend + Nodes: [Moralis](https://moralis.io)
- Smart Contracts: [OpenZeppelin](https://openzeppelin.com/)
- Blockchain: [Avalanche](https://www.avax.network/)

## Contact
If you have any questions, you can reach out at mauricio@symbiotik.co