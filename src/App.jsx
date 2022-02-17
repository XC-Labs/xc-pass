import { useState, useEffect } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { HashRouter as Router, Switch, Route, Redirect, NavLink } from "react-router-dom";
import { Layout } from "antd";
import { WarningFilled } from '@ant-design/icons';
import "antd/dist/antd.css";
import "./style.css";
import abi from "contracts/abi1155.json";

import Home from "components/Home/Home";
import CustomHeader from "components/CustomHeader/CustomHeader";
import Roadmap from "components/Roadmap/Roadmap";
import XCPass from "components/XCPass/XCPass";
import About from "components/About/About";
import Team from "components/Team/Team";
import Minter from "components/Minter/Minter";
import Faq from "components/Faq/Faq";
import Gallery from "components/Gallery/Gallery";
import Collections from "components/Collections/Collections";
import Whitelist from "components/Whitelist/Whitelist";
import Admin from "components/Admin/Admin";
import Footer from "components/Footer/Footer";

const App = () => {

    /*///////////////////
    //CONFIG VARIABLES//
    //////////////////*/
    //const contractAddress = "0x16D57E27504BF2B00e6A550231ABaf0E68D280cD"; //Fuji 721
    const contractAddress = "0xCBE5BcF63dB3DE196bDF342Ad688b719C28E0408"; //Fuji 1155
    const appChainId = 43113; //Fuji (Avalanche mainnet 43114)
    const appChainIdHex = "0xa869"; // Fuji (Avalanche mainnet 0xa86a)
    const chainName = "Avalanche Fuji Testnet"; //Avalanche Mainnet Network

    const { Moralis, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
    const { walletAddress, chainId } = useMoralisDapp();
    const [contractOwnerAddress, setContractOwnerAddress] = useState("");
    const [isOwner, setIsOwner] = useState(undefined);
    const [isMintingPaused, setMintingPaused] = useState(null);
    const [isWhitelistRegActive, setIsWhitelistRegActive] = useState(null);
    const [isWhitelistSaleActive, setIsWhitelistSaleActive] = useState(null);

    useEffect(() => {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(()=>{
      if(isWeb3Enabled){
        getOwner();
        getMintingPaused();
        getWhitelistRegActive();
        getWhitelistSaleActive();
      }
    });

    const getMintingPaused = async () => {
      const options = {
        contractAddress,
        functionName: 'paused',
        abi,
      };
      const response = await Moralis.executeFunction(options);
      setMintingPaused(response);
    }
    const getWhitelistRegActive = async () => {
      const options = {
        contractAddress,
        functionName: 'whitelistRegistration',
        abi,
      };
      const response = await Moralis.executeFunction(options);
      setIsWhitelistRegActive(response);
    }
    const getWhitelistSaleActive = async () => {
      const options = {
        contractAddress,
        functionName: 'whitelistSale',
        abi,
      };
      const response = await Moralis.executeFunction(options);
      setIsWhitelistSaleActive(response);
    }
    const getOwner = async () => {
      const options = {
        contractAddress,
        functionName: 'owner',
        abi,
      };
      const response = await Moralis.executeFunction(options);
      setContractOwnerAddress(response);
    }

    
    const renderedGeneralWarning = () => {
      if(!window.ethereum || !isAuthenticated){
        return <div className="no-wallet"><WarningFilled/> You need a wallet to be able to get whitelisted or mint an XC-Pass. Check our FAQs <NavLink to="/faq">here.</NavLink></div>
      }
      if(chainId!==appChainIdHex){
        return <div className="wrong-network"><WarningFilled/> Please connect to the {chainName}</div>
      }
    }

    const renderedMinterWarning = () => {
      if(isMintingPaused){
        return <div className="minting-paused"><WarningFilled/> Minting is not active at the moment.</div>
      }
      if(isWhitelistSaleActive===true){
        return <div className="whitelist-active"><WarningFilled/> Whitelist sale is Live. Only whitelisted wallets will be able to buy. Be sure to interact with our real contract: {contractAddress}</div>
      }
    }

    useEffect(()=>{
      if(contractOwnerAddress?.toLowerCase() === walletAddress?.toLowerCase()){
        setIsOwner(true);
      }else{
        setIsOwner(false);
      }
    },[walletAddress, contractOwnerAddress])

    return (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Router>
          <CustomHeader
            appChainId={appChainId}
            isAuthenticated={isAuthenticated}
            isOwner={isOwner}
            isMintingPaused={isMintingPaused}
            isWhitelistRegActive={isWhitelistRegActive}
          />
          {renderedGeneralWarning()}
            <Switch>

              <Route path="/" exact>
                <div className="content-wrap home">
                  <Home
                    isAuthenticated={isAuthenticated}
                    isWhitelistRegActive={isWhitelistRegActive}
                    isMintingPaused={isMintingPaused}
                  />
                </div>
              </Route>

              <Route path="/xc-pass">
                <div className="content-wrap xc-pass">
                  <XCPass
                    isAuthenticated={isAuthenticated}
                    isWhitelistRegActive={isWhitelistRegActive}
                    isMintingPaused={isMintingPaused}
                  />
                </div>
              </Route>

              <Route path="/roadmap">
                <div className="content-wrap roadmap">
                  <Roadmap />
                </div>
              </Route>

              <Route path="/what-we-do">
                <div className="content-wrap about">
                  <About />
                </div>
              </Route>

              <Route path="/meet-the-team">
                <div className="content-wrap team">
                  <Team />
                </div>
              </Route>

              <Route path="/whitelist">
                <div className="content-wrap whitelist">
                  {isWhitelistRegActive || <Redirect to="/" /> }
                  {isAuthenticated || <Redirect to="/" /> }
                  <Whitelist
                    isAuthenticated={isAuthenticated}
                    contractAddress={contractAddress}
                    isWhitelistRegActive={isWhitelistRegActive}
                    abi={abi}
                  />
                </div>
              </Route>

              <Route path="/mint">
                <>
                <div className="minter-announcement">
                  {renderedMinterWarning()}
                </div>
                <div className="content-wrap mint">
                  {!isMintingPaused || <Redirect to="/" /> }
                  {isAuthenticated || <Redirect to="/" /> }
                  <Minter 
                    isAuthenticated={isAuthenticated}
                    contractAddress={contractAddress}
                    isMintingPaused={isMintingPaused}
                    appChainId={appChainId}
                    abi={abi}
                  />
                </div>
                </>
              </Route>

              <Route path="/collections/xc-pass">
                <div className="content-wrap gallery">
                  {isAuthenticated || <Redirect to="/" /> }
                  <Gallery
                    isAuthenticated={isAuthenticated}
                    contractAddress={contractAddress}
                    isMintingPaused={isMintingPaused}
                    appChainIdHex={appChainIdHex}
                    abi={abi}
                  />
                </div>
              </Route>
              <Route path="/collections">
                <div className="content-wrap collections">
                  {isAuthenticated || <Redirect to="/" /> }
                  <Collections
                    isAuthenticated={isAuthenticated}
                    contractAddress={contractAddress}
                    abi={abi}
                  />
                </div>
              </Route>
              
              <Route path="/faq">
                <div className="content-wrap faq">
                  <Faq
                    contractAddress={contractAddress}
                  />
                </div>
              </Route>

              <Route path="/xc-labs-admin">
                <div className="content-wrap admin">
                  {(isAuthenticated&&isOwner) || <Redirect to="/" /> }
                  <Admin
                    isMintingPaused={isMintingPaused}
                    isAuthenticated={isAuthenticated}
                    isWhitelistRegActive={isWhitelistRegActive}
                    isWhitelistSaleActive={isWhitelistSaleActive}
                    isOwner={isOwner}
                    contractAddress={contractAddress}
                    appChainIdHex={appChainIdHex}
                    abi={abi}
                  />
                </div>
              </Route>

              <Route path="/nonauthenticated">
                <div className="content-wrap nonauthenticated">
                  Please login using the "Authenticate" button
                </div>
              </Route>

            </Switch>
          <Footer />
        </Router>
      </Layout>
    );
};

export default App;