import { useState, useEffect } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { HashRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Button, Card, Row, Col, Layout } from "antd";

import logo from './assets/logo.png';
import metamask from './assets/metamask.png';
import avalanche from './assets/avalanche.png';
import authenticate from './assets/authenticate.png';

import CustomHeader from "components/CustomHeader/CustomHeader";
import Address from "components/Address/Address";
import Minter from "components/Minter/Minter";
import Gallery from "components/Gallery/Gallery";
import Mixer from "components/Mixer/Mixer";
import Whitelist from "components/Whitelist/Whitelist";
import Roadmap from "components/Roadmap/Roadmap";
import Admin from "components/Admin/Admin";
import abi from "contracts/abi.json";

import "antd/dist/antd.css";
import "./style.css";

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
};

const App = () => {
    const contractAddress = "0xcA216C479642700cB67920d399E5e7ce8E01DF15"; //Fuji
    const { Moralis, isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
    const { walletAddress } = useMoralisDapp();
    const { Meta } = Card;
    const [contractOwnerAddress, setContractOwnerAddress] = useState("");
    const [isOwner, setIsOwner] = useState(undefined);

    useEffect(() => {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(()=>{
      if(isWeb3Enabled) getOwner()
      // eslint-disable-next-line
    });

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

  if(window.ethereum){
    return (
      <Layout style={{ height: "100vh", overflow: "auto", backgroundColor: "#ffffff66" }}>
        <Router>
          <CustomHeader isAuthenticated={isAuthenticated} isOwner={isOwner}/>
          <div style={styles.content}>
            <Switch>
              <Route path="/" exact>
                <div className="home">
                  <h1><img className="main-logo" src={logo} alt="XC Pass Logo" /></h1>
                  <Button
                    size="large"
                    disabled={isAuthenticated ? false : true}
                  >
                    <NavLink to="/whitelist">Whitelist</NavLink>
                  </Button>
                  <Button
                    size="large"
                    disabled={isAuthenticated ? false : true}
                  >
                    <NavLink to="/mint">Mint a Pass</NavLink>
                  </Button>
                  <Button
                    size="large"
                  >
                    <NavLink to="/how-to">How to Mint</NavLink>
                  </Button>
                </div>
              </Route>
              <Route path="/whitelist">
                <>
                {isAuthenticated || <Redirect to="/" /> }
                <Whitelist isAuthenticated={isAuthenticated} contractAddress={contractAddress} abi={abi}/>
                </>
              </Route>
              <Route path="/mint">
                <>
                {isAuthenticated || <Redirect to="/" /> }
                <Minter isAuthenticated={isAuthenticated} contractAddress={contractAddress} abi={abi}/>
                </>
              </Route>
              <Route path="/roadmap">
                <Roadmap />
              </Route>
              <Route path="/how-to">
                <div className="how-to-container" style={{ margin: "auto", display: "flex", gap: "20px", marginTop: "25", width: "50vw" }}>
                  <Card
                    title="FAQ"
                    size="large"
                    style={{
                      width: "100%",
                      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
                      border: "1px solid #e7eaf3",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <h2>How to Mint a NFT</h2>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col className="gutter-row" span={8}>
                        <Card bordered={false} cover={<img alt="metamask" src={metamask} />}>
                          <Meta title="1. Install Metamask" />
                          <p>If you don't have <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</a> installed, first <a href="https://metamask.io/" target="_blank" rel="noreferrer">download it</a> and create an account. Be sure to keep your keys safe!</p>
                        </Card>
                      </Col>
                      <Col className="gutter-row" span={8}>
                        <Card bordered={false} cover={<img alt="avalanche" src={avalanche} />}>
                          <Meta title="2. Switch to Fuji Testnet" />
                          <p>Switch to Fuji (Avalanche Testnet) and be sure to have some Test AVAX. If you need some, please visit an AVAX Faucet like: <a href="https://faucet.avax-test.network/" target="_blank" rel="noreferrer">Fuji Avalanche Testnet Faucet</a></p>
                        </Card>
                      </Col>
                      <Col className="gutter-row" span={8}>
                        <Card bordered={false} cover={<img alt="authenticate" src={authenticate} />}>
                          <Meta title="3. Authenticate" />
                          <p>Authenticate with Metamask using the button in the top right of the site. Once you've done so, go to the <NavLink to="/mint">Minting Page</NavLink>.</p>
                        </Card>
                      </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <h2>What is the Contract Address?</h2>
                    <Address avatar="left" copyable address={contractAddress} size={8} />
                  </Card>
                </div>
              </Route>
              
              <Route path="/gallery">
                <>
                {isAuthenticated || <Redirect to="/" /> }
                <Gallery isAuthenticated={isAuthenticated} contractAddress={contractAddress} abi={abi}/>
                </>
              </Route>
              <Route path="/mixer">
                <>
                {isAuthenticated || <Redirect to="/" /> }
                <Mixer isAuthenticated={isAuthenticated} contractAddress={contractAddress} abi={abi}/>
                </>
              </Route>
              <Route path="/xc-labs-admin">
                <>
                {isAuthenticated || <Redirect to="/" /> }
                <Admin isAuthenticated={isAuthenticated} isOwner={isOwner} contractAddress={contractAddress} abi={abi}/>
                </>
              </Route>
              <Route path="/nonauthenticated">
                <>Please login using the "Authenticate" button</>
              </Route>
            </Switch>
          </div>
        </Router>
      </Layout>
    );
  }else{
    return <Layout style={{ height: "100vh", overflow: "auto", backgroundColor: "#ffffff66" }}>
                <CustomHeader />
                <div style={styles.content}>
                  <Card bordered={false} cover={<img alt="metamask" src={metamask} />}>
                    <Meta title="Install Metamask" />
                    <p>Seems like you don't have <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</a> installed. Please <a href="https://metamask.io/" target="_blank" rel="noreferrer">download it</a> and create an account. Be sure to keep your keys safe!</p>
                  </Card>
                </div>
            </Layout>
  }
};



export default App;
