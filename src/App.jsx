import { useState, useEffect } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";

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
import abi from "contracts/abi.json";

import "antd/dist/antd.css";
import "./style.css";

const App = () => {
    const contractAddress = "0x2C8e71aBF007e5286057612d365F661e8069492d"; //Fuji
    const { Moralis, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
    const { walletAddress } = useMoralisDapp();
    const [contractOwnerAddress, setContractOwnerAddress] = useState("");
    const [isOwner, setIsOwner] = useState(undefined);
    const [isWhitelistRegActive, setIsWhitelistRegActive] = useState(false);
    const [isWhitelistSaleActive, setIsWhitelistSaleActive] = useState(false);

    useEffect(() => {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(()=>{
      if(isWeb3Enabled){
        getOwner();
        getWhitelistRegActive();
        getWhitelistSaleActive();
      }
      // eslint-disable-next-line
    });

    const getWhitelistRegActive = async () => {
      const options = {
        contractAddress,
        functionName: 'whitelistRegistrationActive',
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

    useEffect(()=>{
      // eslint-disable-next-line
      if(contractOwnerAddress?.toLowerCase() == walletAddress?.toLowerCase()){
        setIsOwner(true);
      }else{
        setIsOwner(false);
      }
    },[walletAddress, contractOwnerAddress])

    return (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Router>
          <CustomHeader isAuthenticated={isAuthenticated} isOwner={isOwner} isWhitelistRegActive={isWhitelistRegActive}/>
            <Switch>

              <Route path="/" exact>
                <div className="content-wrap home">
                  <Home isAuthenticated={isAuthenticated} isWhitelistRegActive={isWhitelistRegActive}/>
                </div>
              </Route>

              <Route path="/xc-pass">
                <div className="content-wrap xc-pass">
                  <XCPass isAuthenticated={isAuthenticated} isWhitelistRegActive={isWhitelistRegActive}/>
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
                  <Whitelist isAuthenticated={isAuthenticated} contractAddress={contractAddress} isWhitelistRegActive={isWhitelistRegActive} abi={abi}/>
                </div>
              </Route>

              <Route path="/mint">
                <div className="content-wrap mint">
                  {isAuthenticated || <Redirect to="/" /> }
                  <Minter isAuthenticated={isAuthenticated} contractAddress={contractAddress} isWhitelistRegActive={isWhitelistRegActive} isWhitelistSaleActive={isWhitelistSaleActive} abi={abi}/>
                </div>
              </Route>

              <Route path="/collections/xc-pass">
                <div className="content-wrap gallery">
                  {isAuthenticated || <Redirect to="/" /> }
                  <Gallery isAuthenticated={isAuthenticated} contractAddress={contractAddress} abi={abi}/>
                </div>
              </Route>
              <Route path="/collections">
                <div className="content-wrap collections">
                  {isAuthenticated || <Redirect to="/" /> }
                  <Collections isAuthenticated={isAuthenticated} contractAddress={contractAddress} abi={abi}/>
                </div>
              </Route>
              
              <Route path="/faq">
                <div className="content-wrap faq">
                  <Faq contractAddress={contractAddress}/>
                </div>
              </Route>

              <Route path="/xc-labs-admin">
                <div className="content-wrap admin">
                  {isAuthenticated || <Redirect to="/" /> }
                  <Admin isAuthenticated={isAuthenticated} isOwner={isOwner} contractAddress={contractAddress} abi={abi}/>
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