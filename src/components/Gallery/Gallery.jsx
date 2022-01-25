import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import NftListView from './NftListView';

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
                <h1><strong>{`Gallery (${ nftList[0]?.length ? nftList[0]?.length : "0"})`}</strong></h1>
                <NftListView list={nftList} nftSize={200}/>   
            </div>
            

    )
}
