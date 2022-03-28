import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Button, Row, Col, Form, notification } from "antd";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useMoralis } from "react-moralis";
import nft from '../../assets/xcpass.png';

const Whitelist = (props) => {
  const { isAuthenticated, contractAddress, appChainIdHex, chainName, abi, isWhitelistRegActive, registerPageView, registerPageEvent } = props;
  const { Moralis } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [userAddress, setUserAddress] = useState("");
  const [responses, setResponses] = useState({});
  const [registrationOn, setRegistrationOn] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [isChecked, setIschecked] = useState(false);
  
  useEffect(() => {
    document.title = "Whitelist for XC Pass | XC Labs";
    registerPageView("/whitelist" + window.location.search);
  }, [registerPageView]);

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

  useEffect(()=>{
    if(isAuthenticated){
      const options = {
        contractAddress,
        functionName: 'whitelisted',
        abi,
        params: {
            "": userAddress
        }
      };
      Moralis.executeFunction(options).then((response) =>{
        setIsWhitelisted(response);
      });
    }// eslint-disable-next-line
  });

  useEffect(()=>{
    setIschecked(true);
  },[isWhitelisted])

  useEffect(()=>{
    setUserAddress(walletAddress);
  },[walletAddress])

  if(isWhitelistRegActive){
    if(isChecked){
      if(isWhitelisted){
        return <div className="whitelist-container">
          <h1 className="extra-big">Whitelist</h1>
              <Row>
                <Col span={12} className="minter-left-side">
                  <img src={nft} alt="NFT Preview" />
                </Col>
                <Col span={12} className="minter-right-side whitelisted">
                    <h2>Your address is whitelisted!</h2>
                    <p>Be sure to follow us on any of our announcement channels to tune into the mint date!</p>
                    <Button>
                      <a href="https://t.me/+RnEQT6GjAS43YzA5" title="Telegram" target="_blank" rel="noreferrer">Telegram</a>
                    </Button>
                    <Button>
                      <a href="https://chat.whatsapp.com/DdvXXkKD8M78VAfs8dqIVV" title="Whatsapp" target="_blank" rel="noreferrer">Whatsapp</a>
                    </Button>
                    <Button>
                      <a href="https://discord.gg/ZEPFcNxHwC" title="Discord" target="_blank" rel="noreferrer">Discord</a>
                    </Button>
                    <div className="successfulWhitelist">
                      <svg aria-hidden="true" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                    </div>
                </Col>
              </Row>
            </div>
      }else{
        return (
            <div className="whitelist-container">
              <h1 className="extra-big">Whitelist</h1>
              <Row>
                <Col span={12} className="minter-left-side">
                  <img src={nft} alt="NFT Preview" />
                </Col>
                <Col span={12} className="minter-right-side">
                  {
                  chainId===appChainIdHex || 
                  <div className="wrong-network">To be able to register, please connect to <strong>{chainName}</strong>.</div>
                  }
                  
                  <Form.Provider
                    onFormFinish={async (name) => {
                      registerPageEvent("Whitelist","Whitelist Attempt");
                      setRegistrationOn(true);
                      let isView = false;

                      for (let method of abi) {
                        if (method.name !== name) continue;
                        if (method.stateMutability === "view") isView = true;
                      }
        
                      const options = {
                        contractAddress,
                        functionName: "whitelistUser",
                        abi,
                        params: {
                            "_user": userAddress
                        }
                      };

                      if (!isView) {
                        const tx = await Moralis.executeFunction({ awaitReceipt: false, ...options });
                        tx.on("transactionHash", (hash) => {
                          setResponses({ ...responses, [name]: { result: null, isLoading: true } });
                          openNotification({
                            message: "Transaction Sent",
                            description: `${hash}`,
                          });
                        })
                          .on("receipt", (receipt) => {
                            setResponses({ ...responses, [name]: { result: null, isLoading: false } });
                            openNotification({
                              message: "Transaction Successful",
                              description: `${receipt.transactionHash}`,
                            });
                            setRegistrationOn(false);
                            registerPageEvent("Whitelist","Whitelisted Wallet");
                          })
                          .on("error", (error) => {
                            setResponses({ ...responses, [name]: { result: null, isLoading: false } });
                            openNotification({
                              message: "Transaction Error",
                              description: "Something went wrong with the transaction. Feel free to try again.",
                            });
                            setRegistrationOn(false);
                            registerPageEvent("Whitelist","Whitelist Error");
                          });
                      }
                    }}
                  >
                      <Form layout="vertical" name="whitelistUser">
                        <h4>To be able to mint during the Pre-Sale, you have to register your Wallet Address in the Whitelist.<br/><br/>Registration has no cost (only gas). </h4>
                        <br/>
                        <div className="minting-inputs">
              
                          <Form.Item style={{ marginBottom: "5px" }}>
                            <Button
                              type="primary"
                              size="large"
                              htmlType="submit"
                              loading={responses["whitelistUser"]?.isLoading}
                              disabled={
                                !registrationOn&&chainId===appChainIdHex?false:true
                              }
                              onClick={() => registerPageEvent("Whitelist","Whitelist Registration Attempt")}
                            >
                              {registrationOn ? "Whitelisting..." : "Whitelist your wallet!"}
                            </Button>
                          </Form.Item>
                        </div>
                      </Form>
                  </Form.Provider>
                </Col>
              </Row>
            </div>
          );
      }
    }else{
      return <div className="mintLoading">
              <svg aria-hidden="true" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
            </div>
    }
  }else{
    return <div className="whitelist-container">Whitelist registration is not active.</div>
  }
}
export default withRouter(Whitelist);