import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import App from "./App";
import "./index.css";
import loaderLogo from './assets/header-logo.gif';

/*///////////////////
//CONFIG VARIABLES//
//////////////////*/
const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
/*
LIVE AND TEST CONTRACTS: 
Fuji Testnet ERC-721: 0x5A345dBbfe77b858e3Ff92aF313bF8AeF4A7b023 
Fuji Testnet ERC-1155: 0xCBE5BcF63dB3DE196bDF342Ad688b719C28E0408 
Mainnet ERC-1155: 0xCC1900C310be8177f2850Fe3f8A93B1a74A9c886
Mainnet ERC-721: 0x96E29d3c0dE3B26ab6cf3dEa70a8415123d766dE
*/
const contractAddress = "0x96E29d3c0dE3B26ab6cf3dEa70a8415123d766dE";
const appChainIdHex = "0xa86a"; // Fuji: 0xa869/43113 - Mainnet: 0xa86a/43114 
const chainName = "Avalanche Mainnet"; //Avalanche Fuji Testnet - Avalanche Mainnet Network
const secondaryAdminWallet = "0x4Fe4aF4f04BA17fF0a60c3e78EB37d7fC4597ec9"; //Secondary wallet that will have access to Admin panel
/////////////////////

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <div className="app-wrapper">
            <div id="loading-app"><img src={loaderLogo} alt="Loading..."/></div>
            <App
              isServerInfo
              contractAddress={contractAddress}
              appChainIdHex={appChainIdHex}
              chainName={chainName}
              secondaryAdminWallet={secondaryAdminWallet}
            />
          </div>
        </MoralisDappProvider>
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Check config...
      </div>
    );
  }
};
ReactDOM.render(
  // <React.StrictMode>
  <Application />,
  // </React.StrictMode>,
  document.getElementById("root")
);