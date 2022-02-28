import { Row, Col, Button, Card, Form, notification, Input } from "antd";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function Admin(props) {
  const { isMintingPaused, isAuthenticated, isWhitelistSaleActive, isWhitelistRegActive, contractAddress, secondaryAdminWallet, appChainIdHex, isOwner, abi } = props;
  const { Moralis } = useMoralis();
  const [responses, setResponses] = useState({});
  const [fundsInContract, setFundsInContract] = useState();
  const [totalAmountMinted, setTotalAmountMinted] = useState();
  const [whitelistedAmount, setWhitelistedAmount] = useState();
  const [cost, setCost] = useState(undefined);
  const [baseUri, setBaseUri] = useState(undefined);
  const [addressToCheck, setAddressToCheck] = useState("");
  const [balanceOfAddress, setBalanceOfAddress] = useState(undefined);
  const [isAddressWhitelisted, setIsAddressWhitelisted] = useState(undefined);
  const [tokensInWallet, setTokensInWallet] = useState(undefined);
  const [tokenToCheck, setTokenToCheck] = useState("");
  const [ownerOfToken, setOwnerOfToken] = useState("");
  const [ownerOfContract, setOwnerOfContract] = useState("");
  const [amountBurned, setAmountBurned] = useState("");
  const [ownerMinted, setOwnerMinted] = useState("");
  const [amountToMint, setAmountToMint] = useState("");
  const [addressToMint, setAddressToMint] = useState("");
  const [tokensToTransfer, setTokensToTransfer] = useState("");
  const [walletForTransfer, setWalletForTransfer] = useState("");
  const [tokensToBurn, setTokensToBurn] = useState("");
  
  useEffect(()=>{
    if(isAuthenticated){
      const options1 = {
        contractAddress,
        functionName: 'totalSupply',
        abi,
        params: {"id":"0"}
      };
      Moralis.executeFunction(options1).then((response) =>{
        setTotalAmountMinted(response);
      });
      const options2 = {
        contractAddress,
        functionName: 'cost',
        abi,
      };
      Moralis.executeFunction(options2).then((response) =>{
        setCost(Moralis.Units.FromWei(response.toString()));
      });
      const options3 = {
        contractAddress,
        functionName: 'baseURI',
        abi,
        params: {"":"0"}
      };
      Moralis.executeFunction(options3).then((response) =>{
        setBaseUri(response);
      });
      const options4 = {
        contractAddress,
        functionName: 'whitelistTotal',
        abi,
      };
      Moralis.executeFunction(options4).then((response) =>{
        setWhitelistedAmount(response);
      });
      const options5 = {
        contractAddress,
        functionName: 'amountBurned',
        abi,
      };
      Moralis.executeFunction(options5).then((response) =>{
        setAmountBurned(response);
      });
      const options6 = {
        contractAddress,
        functionName: 'ownerMinted',
        abi,
      };
      Moralis.executeFunction(options6).then((response) =>{
        setOwnerMinted(response);
      });
      getBalanceOfContract();
    }
  });

  const getBalanceOfContract = async () => {
    const options = { chain: appChainIdHex, address: contractAddress};
    const response = await Moralis.Web3API.account.getNativeBalance(options);
    setFundsInContract(Moralis.Units.FromWei(response.balance.toString()));
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

   const ifIsOwner = () => {
    // eslint-disable-next-line
    if(!isOwner){
        return <>Not Admin</>
    }else{
      return <div id="admin-panel">
        

            <Row className="sc-stats-container">
                <Col className="sc-stats"><h4 className="sc-stats-name">Amount minted</h4><span className="sc-stats-value">{totalAmountMinted}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Owner minted</h4><span className="sc-stats-value">{ownerMinted}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Amount Burned</h4><span className="sc-stats-value">{amountBurned}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Funds in contract</h4><span className="sc-stats-value"> { fundsInContract } AVAX</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Cost</h4><span className="sc-stats-value">{cost} AVAX</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Whitelisted: </h4><span className="sc-stats-value">{whitelistedAmount}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Registration active</h4><span className="sc-stats-value">{isWhitelistRegActive ? "true" : "false"}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Private sale active</h4><span className="sc-stats-value">{isWhitelistSaleActive ? "true" : "false"}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Paused</h4><span className="sc-stats-value">{isMintingPaused ? "true" : "false"}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Base URI</h4><span className="sc-stats-value nocaps">{baseUri}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Secondary Admin Wallet</h4><span className="sc-stats-value nocaps">{secondaryAdminWallet}</span></Col>
                <Col className="sc-stats"><h4 className="sc-stats-name">Gnosis Wallet</h4><span className="sc-stats-value nocaps">0x2fc09613d640E34054f3f0D6e0e37ef36F569653</span></Col>
            </Row>
            
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
                }).catch(err => {
                  setResponses({ ...responses, "toggleWhitelistRegistration": { result: err, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="toggleWhitelistRegistration">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Toggle Whitelist Registration</h4>
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
                }).catch(err => {
                  setResponses({ ...responses, "toggleWhitelistSale": { result: err, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="toggleWhitelistSale">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Toggle Whitelist Sale</h4>
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
                        message: "Contract Pause Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "pause": { result: response, isLoading: false } });
                }).catch(err => {
                  setResponses({ ...responses, "pause": { result: err, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="pause">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Pause</h4>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["pause"]?.isLoading}
                        >
                        Pause
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
              onFormFinish={async () => {
                const options = {
                  contractAddress,
                  functionName: 'unpause',
                  abi
                };
                setResponses({ ...responses, "unpause": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Contract Unpause Successful",
                        description: response.transactionHash,
                      });
                    setResponses({ ...responses, "unpause": { result: response, isLoading: false } });
                }).catch(err => {
                  setResponses({ ...responses, "unpause": { result: err, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="unpause">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Unpause</h4>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["unpause"]?.isLoading}
                        >
                        Unpause
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
                }).catch(err => {
                  setResponses({ ...responses, "balanceOf": { result: err, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="balanceOf">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Balance</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}} placeholder="Address"/>
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
                }).catch(err => {
                  setResponses({ ...responses, "whitelisted": { result: err, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="whitelisted">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Whitelist</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}} placeholder="Address"/>
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
                }).catch(err => {
                  setResponses({ ...responses, "removeWhitelistUser": { result: err, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="removeWhitelistUser">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Remove from Whitelist</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}} placeholder="Address"/>
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
                }).catch(err => {
                  setResponses({ ...responses, "walletOfOwner": { result: err, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="walletOfOwner">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Tokens in Wallet</h4>
                        <Input type="text" value={addressToCheck} onChange={(e)=>{setAddressToCheck(e.target.value)}} placeholder="Address"/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["walletOfOwner"]?.isLoading}
                        >
                        Check
                        </Button>
                    </Col>
                    <Col className="sc-result"><Input type="textbox" value={tokensInWallet?.replaceAll(" ","")} readOnly /></Col>
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
                }).catch(err => {
                  setResponses({ ...responses, "ownerOf": { result: err, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="ownerOf">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Check Owner of Token</h4>
                        <Input type="text" value={tokenToCheck} onChange={(e)=>{setTokenToCheck(e.target.value)}} placeholder="Address"/>
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

            <Form.Provider
            onFormFinish={async () => {
                const options = {
                contractAddress,
                functionName: 'mint',
                abi,
                params: {
                    "_to": addressToMint,
                    "_mintAmount": amountToMint
                }
                };
                setResponses({ ...responses, "mint": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Minting Successful",
                        description: response.transactionHash,
                    });
                    setResponses({ ...responses, "mint": { result: response, isLoading: false } });
                }).catch(err => {
                  setResponses({ ...responses, "mint": { result: err, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="mint">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Mint Tokens</h4>
                        <Input type="text" value={addressToMint} onChange={(e)=>{setAddressToMint(e.target.value)}} placeholder="Address to mint"/>
                        <Input type="number" value={amountToMint} onChange={(e)=>{setAmountToMint(e.target.value)}} placeholder="Amount"/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["mint"]?.isLoading}
                        >
                        Mint
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
            onFormFinish={async () => {
                const options = {
                contractAddress,
                functionName: 'safeTransferBatch',
                abi,
                params: {
                    "ids": tokensToTransfer.split(","),
                    "_to": walletForTransfer
                }
                };
                setResponses({ ...responses, "safeTransferBatch": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Transfer Successful",
                        description: response.transactionHash,
                    });
                    setResponses({ ...responses, "safeTransferBatch": { result: response, isLoading: false } });
                }).catch(err => {
                  setResponses({ ...responses, "safeTransferBatch": { result: err, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="safeTransferBatch" className="sc-function-warning">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Transfer Tokens</h4>
                        <Input type="text" value={walletForTransfer} onChange={(e)=>{setWalletForTransfer(e.target.value)}} placeholder="Address to transfer"/>
                        <Input type="text" value={tokensToTransfer} onChange={(e)=>{setTokensToTransfer(e.target.value)}} placeholder="IDs"/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["safeTransferBatch"]?.isLoading}
                        >
                        Transfer
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

            <Form.Provider
            onFormFinish={async () => {
                const options = {
                contractAddress,
                functionName: 'burnPasses',
                abi,
                params: {
                    "ids": tokensToBurn.split(",")
                }
                };
                setResponses({ ...responses, "burnPasses": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    openNotification({
                        message: "Burning of Tokens Successful",
                        description: response.transactionHash,
                    });
                    setResponses({ ...responses, "burnPasses": { result: response, isLoading: false } });
                }).catch(err => {
                  setResponses({ ...responses, "burnPasses": { result: err, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="burnPasses" className="sc-function-warning">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Burn Tokens</h4>
                        <Input type="text" value={tokensToBurn} onChange={(e)=>{setTokensToBurn(e.target.value)}} placeholder="IDs"/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["burnPasses"]?.isLoading}
                        >
                        Burn
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>

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
                }).catch(err => {
                  setResponses({ ...responses, "withdraw": { result: err, isLoading: false } });
                });

              }}
            >
                <Form layout="vertical" name="withdraw" className="sc-function-warning">
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
                functionName: 'transferOwnership',
                abi,
                params: {
                    "newOwner": ownerOfContract
                }
                };
                setResponses({ ...responses, "transferOwnership": { result: null, isLoading: true } });
                Moralis.executeFunction(options).then((response) =>{
                    setOwnerOfToken(response);
                    openNotification({
                        message: "Ownership Transfer Successful",
                        description: response.transactionHash,
                    });
                    setResponses({ ...responses, "transferOwnership": { result: response, isLoading: false } });
                }).catch(err => {
                  setResponses({ ...responses, "transferOwnership": { result: err, isLoading: false } });
                });

            }}
            >
                <Form layout="vertical" name="transferOwnership" className="sc-function-warning">
                    <Row>
                    <Col className="sc-function-box">
                        <h4 className="sc-function-name">Transfer Ownership of Contract</h4>
                        <Input type="text" value={ownerOfContract} onChange={(e)=>{setOwnerOfContract(e.target.value)}} placeholder="Address"/>
                        <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["transferOwnership"]?.isLoading}
                        >
                        Transfer
                        </Button>
                    </Col>
                    </Row>
                </Form>
            </Form.Provider>
           
      </div>
    }
  }
  
  return (
    <>
      <div className="minter-wrapper" style={{ margin: "auto", display: "flex", gap: "20px", marginTop: "25", width: "50vw" }}>
        <Card
          title={
            <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
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
          }}
        >
        { ifIsOwner() }
        </Card>
      </div>
    </>
  );
}