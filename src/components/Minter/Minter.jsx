import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Button, InputNumber, Form, notification, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMoralis } from "react-moralis";
import nft from '../../assets/xcpass.png';
import mintingBg from '../../assets/minting.png';
import successfulBg from '../../assets/successful.png';
import logo from '../../assets/xcpass-logo_big.png';

export default function Minter(props) {
  const nftPrice = "1";
  const { isAuthenticated, contractAddress, isMintingPaused, abi } = props;
  const { Moralis } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [amountMinted, setAmountMinted] = useState(0);
  const [amountToMint, setAmountToMint] = useState(1);
  const [userAddress, setUserAddress] = useState("");
  const [txId, setTxId] = useState("");
  const [responses, setResponses] = useState({});
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState(false);
  const [mintOn, setMintOn] = useState(false);
  const [modalInView, setModalInView] = useState(false);

  const renderedResult = () => {
    if(mintOn){
      return <div className="mintLoading">
                <div className="progress-circle-animation">
                  <img src={mintingBg} alt=""/>
                </div>
                <div className="mint-loading-content">
                  <span>Transaction Status</span>
                  <h3 style={{marginBottom: "0"}}>Minting</h3>
                </div>
              </div>
    }
    if(mintSuccess){
      return <>
      <div className="successfulMint">
        <div className="successful-circle">
          <img src={successfulBg} alt=""/>
        </div>
        <div className="mint-loading-content">
          <span>Transaction Status</span>
          <h3>Successful!</h3>
          <svg aria-hidden="true" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
        </div>
      </div>
      <div>
        <Button
          type="primary"
        >
          <NavLink to="/collections/gallery">See my XC Pass</NavLink>
        </Button>
        <br/>
        <a className="see-transaction" href={`https://testnet.snowtrace.io/tx/${txId}`} target="_blank" rel="noreferrer">
          See Transaction&nbsp;
          <svg aria-hidden="true"data-icon="external-link-alt" className="external-link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12"><path fill="#aaaaaa" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg>  
        </a>
      </div>
      </>
    }
    if(mintError){
      return <div className="mintError">
        <h2>Sorry, something went wrong</h2>
      </div>
    }
    else{
      return <>No transactions yet.</>;
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

  const subAmount = (e) => {
    e.preventDefault();
    setAmountToMint(amountToMint-1)
  }
  const addAmount = (e) => {
    e.preventDefault();
    setAmountToMint(amountToMint+1)
  }
  
  useEffect(()=>{
    if(isAuthenticated){
      const options1 = {
        contractAddress,
        functionName: 'balanceOf',
        abi,
        params: {
          "account": walletAddress, "id": "0"
        }
      };
      Moralis.executeFunction(options1).then((response) =>{
        setAmountMinted(response);
      });
    }
  });

  useEffect(()=>{
    setUserAddress(walletAddress);
  },[walletAddress])
  
  return <div className="minter-container">
      <div className="minter-modal" style={modalInView ? {display: "flex"} : {display: "none"}} onClick={()=>{!mintOn ? setModalInView(false) : setModalInView(true)}}>
        <div className="modal-container">
          
            { renderedResult() }
            
            <button 
              className="close-modal" 
              disabled={mintOn ? true : false}
              onClick={()=>{setModalInView(false)}}>
              {mintOn ? "Please wait..." : "Close"}
            </button>
          
        </div>
      </div>
      <h1 className="extra-big"><span>Mint your</span><br/><img src={logo} alt="XC Pass logo" /></h1>
      <Row>
        <Col span={12} className="minter-left-side">
          <img src={nft} alt="NFT Preview" />
        </Col>
        <Col span={12} className="minter-right-side">

          <Form.Provider
              onFormFinish={async (name, { forms }) => {
                setModalInView(true);
                setMintOn(true);
                const params = forms[name].getFieldsValue();
                params._to = userAddress;
                params._mintAmount = amountToMint;

                let isView = false;

                for (let method of abi) {
                  if (method.name !== name) continue;
                  if (method.stateMutability === "view") isView = true;
                }

                const options = {
                  contractAddress,
                  functionName: "mint",
                  abi,
                  params,
                  msgValue: Moralis.Units.ETH(nftPrice) * amountToMint
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
                      setTxId(receipt.transactionHash);
                      setMintOn(false);
                      setMintSuccess(true);
                    })
                    .on("error", (error) => {
                      setResponses({ ...responses, [name]: { result: null, isLoading: false } });
                      openNotification({
                        message: "Transaction Error",
                        description: "Something went wrong with the transaction. Feel free to try again.",
                      });
                      setMintOn(false);
                      setMintSuccess(false);
                      setMintError(true);
                    });
                }
              }}
            >
                <Form layout="vertical" name="mint" initialValues={{_mintAmount: '0'}}>

                  <div className="minting-inputs">
                    <Form.Item
                      className="mint-amount"
                      name="_mintAmount"
                      required
                      style={{ marginTop: "25px", marginBottom: "15px" }}
                    >
                      <button className="change-amount-button" onClick={(e)=>subAmount(e)}>-</button>
                      <InputNumber controls={false} type="number" min="1" max="50" value={amountToMint} onChange={(e)=>setAmountToMint(e.target.value)}/>
                      <button className="change-amount-button" onClick={(e)=>addAmount(e)}>+</button>
                      
                    </Form.Item>
                    <span>XP Passes minted: {amountMinted}/50</span>
                    <Form.Item style={{ marginBottom: "5px" }}>
                      <Button
                        className="mint-button"
                        size="large"
                        htmlType="submit"
                        loading={responses["mint"]?.isLoading}
                        disabled={// eslint-disable-next-line
                          !mintOn&&chainId==43113&&!isMintingPaused?false:true
                        }
                      >
                        {mintOn ? "Minting..." : "Mint a XC Pass"}
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
            </Form.Provider>
            <div className="minting-info">
              <span>- XC-Pass unlocks access to our community. <NavLink to="/xc-pass">Learn more.</NavLink></span><br/><br/>
              <span>- XC-Pass price: 1 AVAX (<a href="https://coinmarketcap.com/currencies/avalanche/" rel="noreferrer" target="_blank">Check price</a>) + Gas</span><br/><br/>
              <span>- Max. per wallet: 50 XC-Passes</span>
            </div>
        </Col>
      </Row>
    </div>
}
