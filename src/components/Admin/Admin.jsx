import { Row, Col, Button, Card, Form, notification, Input } from "antd";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function Admin(props) {
  const { isAuthenticated, contractAddress, isOwner, abi } = props;
  const { Moralis } = useMoralis();
  const [fundsInContract, setFundsInContract] = useState();
  const [responses, setResponses] = useState({});
  const [amountMinted, setAmountMinted] = useState();
  const [whitelistRegistrationActive, setWhitelistRegistrationActive] = useState(undefined);
  const [whitelistSaleActive, setWhitelistSaleActive] = useState(undefined);
  const [isPaused, setIsPaused] = useState(undefined);
  const [cost, setCost] = useState(undefined);
  const [baseUri, setBaseUri] = useState(undefined);
  const [addressToCheck, setAddressToCheck] = useState("");
  const [balanceOfAddress, setBalanceOfAddress] = useState(undefined);
  const [isAddressWhitelisted, setIsAddressWhitelisted] = useState(undefined);
  const [tokensInWallet, setTokensInWallet] = useState(undefined);
  const [tokenToCheck, setTokenToCheck] = useState("");
  const [ownerOfToken, setOwnerOfToken] = useState("");

  const styles = {
      admin_title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }
  }
  
  useEffect(()=>{
    if(isAuthenticated){
      const options1 = {
        contractAddress,
        functionName: 'totalSupply',
        abi,
      };
      Moralis.executeFunction(options1).then((response) =>{
        setAmountMinted(response);
      });
      const options2 = {
        contractAddress,
        functionName: 'whitelistRegistrationActive',
        abi,
      };
      Moralis.executeFunction(options2).then((response) =>{
        setWhitelistRegistrationActive(response);
      });
      const options3 = {
        contractAddress,
        functionName: 'whitelistSale',
        abi,
      };
      Moralis.executeFunction(options3).then((response) =>{
        setWhitelistSaleActive(response);
      });
      const options4 = {
        contractAddress,
        functionName: 'paused',
        abi,
      };
      Moralis.executeFunction(options4).then((response) =>{
        setIsPaused(response);
      });
      const options5 = {
        contractAddress,
        functionName: 'cost',
        abi,
      };
      Moralis.executeFunction(options5).then((response) =>{
        setCost(Moralis.Units.FromWei(response.toString()));
      });
      balance();
      const options6 = {
        contractAddress,
        functionName: 'baseURI',
        abi,
      };
      Moralis.executeFunction(options6).then((response) =>{
        setBaseUri(response);
      });
      balance();
    }
  });

  const balance = async () => {
    const options = { chain: "avalanche testnet", address: contractAddress};
    const response = await Moralis.Web3API.account.getNativeBalance(options);
    setFundsInContract(Moralis.Units.FromWei(response.balance.toString()));
  }

   const ifIsOwner = () => {
    // eslint-disable-next-line
    if(!isOwner){
        return <>Not Admin</>
    }else{
      return <div id="admin-panel">
        <Card
          title={
                <div style={styles.admin_title}>
                    <h3>Manage Smart Contract</h3>
                    <div>
                        <a href={`https://testnet.snowtrace.io/address/${contractAddress}`} title="See Contract on Snowtrace" target="_blank" rel="noreferrer">See Contract on Snowtrace</a>
                    </div>
                </div>
            }
          size="large"
          style={{
            width: "100%",
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            border: "1px solid #e7eaf3",
            borderRadius: "0.5rem",
          }}>

            <Row className="sc-stats-container">
                <Col className="sc-stats"><h4 className="sc-stats-name">Funds in contract</h4><span className="sc-stats-value"> { fundsInContract } AVAX</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Amount minted</h4><span className="sc-stats-value">{amountMinted}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Registration active</h4><span className="sc-stats-value">{whitelistRegistrationActive ? "true" : "false"}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Private sale active</h4><span className="sc-stats-value">{whitelistSaleActive ? "true" : "false"}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Paused</h4><span className="sc-stats-value">{isPaused ? "true" : "false"}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Cost</h4><span className="sc-stats-value">{cost} AVAX</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Base URI</h4><span className="sc-stats-value">{baseUri}</span></Col>
            </Row>

            <Form.Provider
              onFormFinish={async () => {
                const options = {
                  contractAddress,
                  functionName: 'withdraw',
                  abi,
                };
                setResponses({ ...responses, "withdraw": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Withdrawal Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "withdraw": { result: response, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="withdraw">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Withdraw funds</h4>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["withdraw"]?.isLoading}
                        >
                        Withdraw
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>
            
            <Form.Provider
              onFormFinish={async () => {
                const options = {
                  contractAddress,
                  functionName: 'toggleWhitelistRegistration',
                  abi
                };
                setResponses({ ...responses, "toggleWhitelistRegistration": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Toogle Whitelist Registration Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "toggleWhitelistRegistration": { result: response, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="toggleWhitelistRegistration">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Toogle Whitelist Registration</h4>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["toggleWhitelistRegistration"]?.isLoading}
                        >
                        Toggle
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
              onFormFinish={async () => {
                const options = {
                  contractAddress,
                  functionName: 'toggleWhitelistSale',
                  abi
                };
                setResponses({ ...responses, "toggleWhitelistSale": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Toogle Whitelist Sale Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "toggleWhitelistSale": { result: response, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="toggleWhitelistSale">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Toogle Whitelist Sale</h4>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["toggleWhitelistSale"]?.isLoading}
                        >
                        Toggle
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
              onFormFinish={async () => {
                const options = {
                  contractAddress,
                  functionName: 'pause',
                  abi
                };
                setResponses({ ...responses, "pause": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Toogle Pause Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "pause": { result: response, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="pause">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Toogle Pause</h4>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["pause"]?.isLoading}
                        >
                        Toggle
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
              onFormFinish={async () => {
                const options = {
                  contractAddress,
                  functionName: 'balanceOf',
                  abi,
                  params: {
                      "owner": addressToCheck
                  }
                };
                setResponses({ ...responses, "balanceOf": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    setBalanceOfAddress(response);
                    openNotification({
                        message: "Check Balance Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "balanceOf": { result: response, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="balanceOf">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Balance</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}}/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["balanceOf"]?.isLoading}
                        >
                        Check
                        </Button>
                    </Col>
                    { !balanceOfAddress || <Col className="sc-result">Wallet has {balanceOfAddress} passes</Col>}
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
              onFormFinish={async () => {
                const options = {
                  contractAddress,
                  functionName: 'whitelisted',
                  abi,
                  params: {
                      "": addressToCheck
                  }
                };
                setResponses({ ...responses, "whitelisted": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    setIsAddressWhitelisted(response);
                    openNotification({
                        message: "Check Whitelist Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "whitelisted": { result: response, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="whitelisted">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Whitelist</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}}/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["whitelisted"]?.isLoading}
                        >
                        Check
                        </Button>
                    </Col>
                    <Col className="sc-result">{isAddressWhitelisted ? "true" : !isAddressWhitelisted ? "false": ""}</Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
            onFormFinish={async () => {
                const options = {
                contractAddress,
                functionName: 'removeWhitelistUser',
                abi,
                params: {
                    "_user": addressToCheck
                }
                };
                setResponses({ ...responses, "removeWhitelistUser": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Remove from Whitelist Successful",
                        description: response.transactionHash,
                    });
                    setResponses({ ...responses, "removeWhitelistUser": { result: response, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="removeWhitelistUser">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Remove from Whitelist</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}}/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["removeWhitelistUser"]?.isLoading}
                        >
                        Remove
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
            onFormFinish={async () => {
                const options = {
                contractAddress,
                functionName: 'walletOfOwner',
                abi,
                params: {
                    "_owner": addressToCheck
                }
                };
                setResponses({ ...responses, "walletOfOwner": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    setTokensInWallet(response.join(", "));
                    openNotification({
                        message: "Check Tokens in Wallet Successful",
                        description: response.transactionHash,
                    });
                    setResponses({ ...responses, "walletOfOwner": { result: response, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="walletOfOwner">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Tokens in Wallet</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}}/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["walletOfOwner"]?.isLoading}
                        >
                        Check
                        </Button>
                    </Col>
                    <Col className="sc-result">{tokensInWallet}</Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
            onFormFinish={async () => {
                const options = {
                contractAddress,
                functionName: 'ownerOf',
                abi,
                params: {
                    "tokenId": tokenToCheck
                }
                };
                setResponses({ ...responses, "ownerOf": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    setOwnerOfToken(response);
                    openNotification({
                        message: "Check Owner of Token Successful",
                        description: response.transactionHash,
                    });
                    setResponses({ ...responses, "ownerOf": { result: response, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="ownerOf">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Owner of Token</h4>
                        <Input type="text" value={tokenToCheck} onChange={(e)=>{setTokenToCheck(e.target.value)}}/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["ownerOf"]?.isLoading}
                        >
                        Check
                        </Button>
                    </Col>
                    <Col className="sc-result">{ownerOfToken}</Col>
                    </Row>
                </Form>
            </Form.Provider>
           
          </Card>
      </div>
    }
  }

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  
  return (
    <>
      <div className="minter-wrapper" style={{ margin: "auto", display: "flex", gap: "20px", marginTop: "25", width: "50vw" }}>
        <Card
          title="Admin"
          size="large"
          style={{
            width: "100%",
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            border: "1px solid #e7eaf3",
            borderRadius: "0.5rem",
          }}
        >
        { ifIsOwner() }
        </Card>
      </div>
    </>
  );
}