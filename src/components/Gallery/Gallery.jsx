import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {Row, Col, Button, Progress } from "antd";
import { NavLink } from "react-router-dom";
import nft from '../../assets/xc-pass.mp4';
import xcpasslogo from '../../assets/xcpass-logo-black.png';

export default function Gallery(props) {
    
    const { Moralis } = useMoralis();
    const { isAuthenticated, contractAddress, isMintingPaused, abi } = props;
    const { walletAddress } = useMoralisDapp();
    const [ passesAmount, setPassesAmount ] = useState();
    const percentage = Math.floor((passesAmount / 50) * 100);

    /*
    const { appChainIdHex } = props;
    const [ xcPassAsset, setXcPassAsset ] = useState();
    const getUserNFTs = async () => {
        const options = { chain: appChainIdHex, format: 'hex', address: walletAddress, token_address: contractAddress };
        await Moralis.Web3API.account.getNFTsForContract(options).then(userNFTs=>{
            fetch(userNFTs.result[0]?.token_uri).then(res => res.json()).then(res=>{
                let img = res.image.replace("ipfs://","https://ipfs.io/ipfs/");
                setXcPassAsset(img);
            });
        });        
    }
    */

    useEffect(()=>{
        if(isAuthenticated){
            const options = {
                contractAddress,
                functionName: 'balanceOf',
                abi,
                params: {
                    "owner": walletAddress
                }
              };
              Moralis.executeFunction(options).then((response) =>{
                setPassesAmount(response)
              });
            //getUserNFTs();
        }
    // eslint-disable-next-line
    },[walletAddress])

    return (
            <div className="gallery-container">
                <Row>
                    <Col span={12} className="gallery-left-side">
                        <video src={nft} muted={true} autoPlay={true} loop={true} controls={false}></video>
                    </Col>
                    <Col span={12} className="gallery-right-side">
                        <img src={xcpasslogo} className="xc-pass-logo" alt="XC Pass Logo"/>
                        <h4>XC-Pass unlocks access to our community, early investment opportunities, whitelist for our NFTs, and a spot in our trading desk. Buy more passes to increase your level and benefits in our community. <NavLink to="/xc-pass">Learn more.</NavLink></h4>
                        <br/>
                        <Progress percent={percentage} status="active" />
                        <div className="gallery-user-amount">Minted: {passesAmount}/50</div>
                        <br/>
                        <Button
                            disabled={isAuthenticated && !isMintingPaused ? false : true}
                        >
                            <NavLink to="/mint">Mint a XC Pass</NavLink>
                        </Button>
                    </Col>
                </Row>
            </div>
    )
}