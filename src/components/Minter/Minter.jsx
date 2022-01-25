import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Button, Input, Form, notification, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMoralis } from "react-moralis";
import nft from '../../assets/nft.jpg';
import {
  WarningFilled
} from '@ant-design/icons';

export default function Minter(props) {
  const nftPrice = "1";
  const whitelist = true;
  const { isAuthenticated, contractAddress, abi } = props;
  const { Moralis } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [amountMinted, setAmountMinted] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [txId, setTxId] = useState("");
  const [responses, setResponses] = useState({});
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState(false);
  const [mintErrorMsg, setMintErrorMsg] = useState("");
  const [mintOn, setMintOn] = useState(false);
  const [modalInView, setModalInView] = useState(false);

  const renderedResult = () => {
    if(mintOn){
      return <>
              <span>Transaction Status</span>
              <h1>Minting</h1>
              <div className="mintLoading">
                <svg aria-hidden="true" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg> 
              </div>
              </>
    }
    if(mintSuccess){
      return <div className="successfulMint">
        <svg aria-hidden="true" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
        <br/>
        <h2>Successful!</h2>
        
        <Button
          type="primary"
        >
          <NavLink to="/gallery">See my NFT</NavLink>
        </Button>
        <br/>
        <a className="see-transaction" href={`https://testnet.snowtrace.io/tx/${txId}`} target="_blank" rel="noreferrer">
          See Transaction&nbsp;
          <svg aria-hidden="true"data-icon="external-link-alt" className="external-link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12"><path fill="#aaaaaa" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg>  
        </a>
      </div>
    }
    if(mintError){
      return <div className="mintError">
        <svg aria-hidden="true" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="100"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        <h2>Oops... Something went wrong!</h2>
        <p>{mintErrorMsg}</p>
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
  
  useEffect(()=>{
    if(isAuthenticated){
      const options1 = {
        contractAddress,
        functionName: 'walletOfOwner',
        abi,
        params: {
          "_owner": walletAddress
        }
      };
      Moralis.executeFunction(options1).then((response) =>{
        setAmountMinted(response.length);
      });
    }
  });

  useEffect(()=>{
    setUserAddress(walletAddress);
  },[walletAddress])
  
  return (
    <div className="minter-container">

      <div className="minter-announcement">
          {// eslint-disable-next-line
          chainId==43113 || 
          <div className="wrong-network"><WarningFilled/> To be able to mint, please connect to <strong>Fuji Testnet</strong>.</div>
          }
          
          {// eslint-disable-next-line
          whitelist!=true || 
          <div className="whitelist-active"><WarningFilled/> Whitelist is active at the moment. Only people who registered will be able to mint.</div>
          }
      </div>

      <div className="minter-modal" style={modalInView ? {display: "flex"} : {display: "none"}}>
        <div className="modal-container">
          
            { renderedResult() }
            
            <button 
            className="close-modal" 
            disabled={mintOn ? true : false}
            onClick={()=>{setModalInView(false)}}>
              {mintOn ? "Minting..." : "Close"}
            </button>
          
        </div>
      </div>
    <Row>
      <Col span={12} className="minter-left-side">
        <img src={nft} alt="NFT Preview" />
      </Col>
      <Col span={12} className="minter-right-side">
        <h1>XC-Pass</h1>
        <p>XC-Pass unlocks access to our community, early investment opportunities, whitelist for our NFTs, and a spot in our trading desk to earn 30% on your investment. Buy more passes to increase your level and benefits in our community. <NavLink to="/roadmap">Learn more.</NavLink></p>

        <Form.Provider
            onFormFinish={async (name, { forms }) => {
              setModalInView(true);
              setMintOn(true);
              const params = forms[name].getFieldsValue();
              params._to = userAddress;

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
                msgValue: Moralis.Units.ETH(nftPrice) * params._mintAmount
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
                      message: "Transaction Confirmed",
                      description: `${receipt.transactionHash}`,
                    });
                    console.log(receipt);
                    setTxId(receipt.transactionHash);
                    setMintOn(false);
                    setMintSuccess(true);
                  })
                  .on("error", (error) => {
                    setResponses({ ...responses, [name]: { result: null, isLoading: false } });
                    setMintOn(false);
                    setMintErrorMsg(error.message);
                    openNotification({
                      message: "Transaction Error",
                      description: `${error.message}`,
                    });
                    setMintSuccess(false);
                    setMintError(true);
                  });
              }
            }}
          >
              <Form layout="vertical" name="mint">
              <span>XC-Pass price 1 AVAX ($98.5 USD).</span><br/>
              <span>Max. 50 XC-Passes per user’s wallet.</span>
                <div className="minting-inputs">
                  <Form.Item
                    label=""
                    name="_mintAmount"
                    required
                    style={{ marginTop: "25px", marginBottom: "15px" }}
                  >
                    <Input type="number" defaultValue="0" min="1" max="5" />
                  </Form.Item>
                  <span>XP Passes minted: {amountMinted}/50</span>
                  <Form.Item style={{ marginBottom: "5px" }}>
                    <Button
                      className="mint-button"
                      size="large"
                      htmlType="submit"
                      loading={responses["mint"]?.isLoading}
                      disabled={// eslint-disable-next-line
                        !mintOn&&chainId==43113?false:true
                      }
                    >
                      {mintOn ? "Minting..." : "Mint a XC Pass"}
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
