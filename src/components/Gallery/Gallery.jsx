import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {Row, Col, Button } from "antd";
import { NavLink } from "react-router-dom";
import nft from '../../assets/nft.jpg';

export default function Gallery(props) {
    
    const { Moralis } = useMoralis();
    const { isAuthenticated, contractAddress, abi } = props;
    const { walletAddress } = useMoralisDapp();
    const [nftList, setNftList] = useState([]);

    useEffect(()=>{
        if(isAuthenticated){
            const options = {
                contractAddress,
                functionName: 'walletOfOwner',
                abi,
                params: {
                    "_owner": walletAddress
                }
              };
              Moralis.executeFunction(options).then((response) =>{
                setNftList([...nftList, response])
              });
        }
    // eslint-disable-next-line
    },[walletAddress])

    return (
            <div className="gallery-container">
                <Row>
                    <Col span={12} className="gallery-left-side">
                        <img src={nft} alt="NFT Preview" />
                    </Col>
                    <Col span={12} className="gallery-right-side">
                        <h1>XC-Pass</h1>
                        <h3>XC-Pass unlocks access to our community, early investment opportunities, whitelist for our NFTs, and a spot in our trading desk to earn 30% on your investment. Buy more passes to increase your level and benefits in our community. <NavLink to="/xc-pass">Learn more.</NavLink></h3>

                        <div className="gallery-user-amount">You've got: {nftList[0]?.length} passes</div>

                        <Button>
                            <NavLink to="/mint">Mint a XC Pass</NavLink>
                        </Button>
                    </Col>
                    </Row>
            </div>
            

    )
}
