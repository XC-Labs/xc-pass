import { useState, useEffect } from 'react';
import {Button, Modal} from 'antd';
import { withRouter } from "react-router-dom";
import azuki from '../../assets/nfts/azuki-2078.jpg';
import bayc from '../../assets/nfts/bayc-7546.jpg';
import clay from '../../assets/nfts/clay-nation-3030.jpg';
import clonex from '../../assets/nfts/clonex-604.jpg';
import cyberpunk from '../../assets/nfts/cyberpunk-254.gif';
import decentraland from '../../assets/nfts/decentraland53,-2.png';
import fancybear from '../../assets/nfts/fancy_bear_6776.jpg';
import gojira from '../../assets/nfts/gojira.gif';
import moon from '../../assets/nfts/moon-52,17.png';
import moonie from '../../assets/nfts/moonie-130610.jpg';
import adidas from '../../assets/nfts/adidas-nft.jpg';
import apecoin from '../../assets/nfts/elite-ape-entry-coin.jpg';
import moodroller from '../../assets/nfts/moodroller2094.jpg';
import slimhood from '../../assets/nfts/slimhood_3083.jpg';
import superplastic from '../../assets/nfts/superplastic-106.jpg';

const About = (props) => {
    const { registerPageView } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nftInView, setNftInView] = useState({});
    useEffect(() => {
        document.title = "What We Do | XC Labs";  
        registerPageView("/what-we-do" + window.location.search);
    }, [registerPageView]);
    const showModal = (nft) => {
        setNftInView(nft);
        setIsModalVisible(true);
    };
    const hideModal = () => {
        setNftInView({title: "", collection: "", number: "", image: "", chain: "", contract: "", owner: ""});
        setIsModalVisible(false);
    };
    return <div className="about-container">
    <h1 className="extra-big">
        Reality<br/>is what we<br/>want it to be.
    </h1>
    <p>Development spaces today aren’t entirely physical. Virtual and augmented playgrounds are enhancers of our human experience. XC Labs seeks the ultimate societal, economic and technological evolution through new realities.
    <br/><br/>
    This website contains a curated version of the projects, communities & platforms that we believe, invest and participate in. Feel free to explore.</p>

    <br/>
    <br/>
    
    <h2>What we do:</h2>

    <div className="about-block">
        <div className="nfts-wrapper">
            <div className="nft-wrapper">
                <img src={azuki} alt="Azuki #2078" onClick={()=>showModal({title: "Azuki #2078", collection: "Azuki", number: "#2078", image: azuki, chain: "Ethereum", contract: "0xed5af388653567af2f388e6224dc7c4b3241c544", owner: "https://opensea.io/assets/0xed5af388653567af2f388e6224dc7c4b3241c544/2078"})}/>
            </div>
            <div className="nft-wrapper">
                &nbsp;
            </div>
            <div className="nft-wrapper">
                <img src={bayc} alt="BAYC #7546" onClick={()=>showModal({title: "BAYC #7546", collection: "BAYC", number: "#7546", image: bayc, chain: "Ethereum", contract: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", owner: "https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/7546"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={clay} alt="Clay Nation #3030" onClick={()=>showModal({title: "Clay Nation #3030", collection: "Clay Nation", number: "#3030", image: clay, chain: "Cardano", contract: "40fa2aa67258b4ce7b5782f74831d46a84c59a0ff0c28262fab21728", owner: "https://cardanoscan.io/token/f00d1871024531e6f529f4dbde7723d515c9118e"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={clonex} alt="Clonex #604" onClick={()=>showModal({title: "Clonex #604", collection: "Clonex", number: "#604", image: clonex, chain: "Ethereum", contract: "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b", owner: "https://opensea.io/assets/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/17688"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={cyberpunk} alt="Cyberpunk #254" onClick={()=>showModal({title: "Cyberpunk #254", collection: "Cyberpunk", number: "#254", image: cyberpunk, chain: "Cardano", contract: "8478d0f713a5740788bb00ec4d17f2c67b00b42a2b64cdd2c04559e5", owner: "https://cardanoscan.io/token/8478d0f713a5740788bb00ec4d17f2c67b00b42a2b64cdd2c04559e5.CBL254"})}/>
            </div>
        </div>
        <div className="content-wrapper right">
            <h1 className="extra-big">Iterate</h1>
            <p>Establishing a thorough -in-house- exploration of the future of blockchain technology leveraged by NFTs. PFP & art collections are just the beginning; <a href="https://medium.com/xc-labs/the-exciting-future-of-nfts-75c07cdb5f7f" title="">new social, financial & economic</a> value will be delivered and distributed by NFT technology throughout the coming years.</p>
            <p>We aim to build products for human adoption and virtual rebellion.</p>
        </div>
    </div>
    <div className="about-block">
        <div className="content-wrapper">
            <h1 className="extra-big">Acce-<br/>lerate</h1>
            <p>Our main and most radical driver is the massification of the future through our close kin: the Latinamerican Region. As the long-forgotten set of land placed between mediocre development and lack of global economical protagonism, we believe that <a href="https://joxxgallardo.medium.com/the-true-potential-of-blockchain-in-latam-2a6c67c5c79b" title="">true potential can finally become unlocked</a> through DeFi, blockchain, and mainly NFT platforms.</p>
            <p>We leverage and push to market projects starting locally and reaching the metaverse.</p>
        </div>
        <div className="nfts-wrapper">
            <div className="nft-wrapper">
                &nbsp;
            </div>
            <div className="nft-wrapper">
                <img src={decentraland} alt="Decentraland (53,-2)" onClick={()=>showModal({title: "Decentraland (53,-2)", collection: "Decentraland", number: "(53,-2)", image: decentraland, chain: "Ethereum", contract: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d", owner: "https://opensea.io/assets/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/18375247813730677027022228801315483418622"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={fancybear} alt="Fancy Bear #6776" onClick={()=>showModal({title: "Fancy Bear #6776", collection: "Fancy Bear", number: "#6776", image: fancybear, chain: "Ethereum", contract: "0x87084ec881d5a15c918057f326790db177d218f2", owner: "https://opensea.io/assets/0x87084ec881d5a15c918057f326790db177d218f2/6776"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={gojira} alt="Gojira - Legendary HellSpawn" onClick={()=>showModal({title: "Gojira - Legendary HellSpawn", collection: "Gojira", number: "Legendary HellSpawn", image: gojira, chain: "Cardano", contract: "5f7409f326073c20f045f7ef4184a943f56b8c15487e2d0507cd4d77", owner: "https://cardanoscan.io/token/5f7409f326073c20f045f7ef4184a943f56b8c15487e2d0507cd4d77.GLH44"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={moon} alt="Artifakt Moon (-52,17)" onClick={()=>showModal({title: "Artifakt Moon (-52,17)", collection: "Artifakt Moon", number: "(-52,17)", image: moon, chain: "Cardano", contract: "e5a2bcc51466942a9db1da62471a1b682bde3abcebafee2c7fb1e378", owner: "https://cardanoscan.io/token/e5a2bcc51466942a9db1da62471a1b682bde3abcebafee2c7fb1e378.ARTIFCTMOON5217"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={moonie} alt="Moonie #130610" onClick={()=>showModal({title: "Moonie #130610", collection: "Moonie", number: "#130610", image: moonie, chain: "Polygon", contract: "0xcab4f7f57af24cef0a46eed4150a23b36c29d6cc", owner: "https://opensea.io/assets/matic/0xcab4f7f57af24cef0a46eed4150a23b36c29d6cc/136729"})}/>
            </div>
        </div>
    </div>
    <div className="about-block">
        <div className="nfts-wrapper">
            <div className="nft-wrapper">
                <img src={adidas} alt="Adidas NFT" onClick={()=>showModal({title: "Adidas NFT", collection: "Adidas", number: "N/A", image: adidas, chain: "Ethereum", contract: "0x28472a58a490c5e09a238847f66a68a47cc76f0f", owner: "https://opensea.io/assets/0x28472a58a490c5e09a238847f66a68a47cc76f0f/0"})}/>
            </div>
            <div className="nft-wrapper">
                &nbsp;
            </div>
            <div className="nft-wrapper">
                <img src={apecoin} alt="PUNKS 2: Elite Ape Entry Coins" onClick={()=>showModal({title: "PUNKS 2: Elite Ape Entry Coins", collection: "Elite Ape Entry Coins", number: "N/A", image: apecoin, chain: "Ethereum", contract: "0xd0b53410454370a482979c0adaf3667c6308a801", owner: "https://opensea.io/assets/0xd0b53410454370a482979c0adaf3667c6308a801/0"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={moodroller} alt="MoodRoller #2094" onClick={()=>showModal({title: "MoodRoller #2094", collection: "MoodRollers by Lucas Zanotto", number: "#2094", image: moodroller, chain: "Ethereum", contract: "0xe3234e57ac38890a9136247eadfe1860316ff6ab", owner: "https://opensea.io/assets/0xe3234e57ac38890a9136247eadfe1860316ff6ab/2094"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={slimhood} alt="SlimHood #3083" onClick={()=>showModal({title: "SlimHood #3083", collection: "SlimHoods", number: "#3083", image: slimhood, chain: "Ethereum", contract: "0x2931b181ae9dc8f8109ec41c42480933f411ef94", owner: "https://opensea.io/assets/0x2931b181ae9dc8f8109ec41c42480933f411ef94/3083"})}/>
            </div>
            <div className="nft-wrapper">
                <img src={superplastic} alt="SUPERPLASTIC: Cryptojankyz" onClick={()=>showModal({title: "STANK COMPLETE #106", collection: "SUPERPLASTIC: Cryptojankyz", number: "#106", image: superplastic, chain: "Ethereum", contract: "0x066f2d5ead7951f0d0038c19affd500b9f02c0e5", owner: "https://opensea.io/assets/0x066f2d5ead7951f0d0038c19affd500b9f02c0e5/10159"})}/>
            </div>
        </div>
        <div className="content-wrapper right">
            <h1 className="extra-big">Multiply</h1>
            <p>Creating innovative mechanisms to generate resources and allocate value: scalability is always a byproduct of our work. Our main assessment is to <a href="https://medium.com/xc-labs/what-is-the-phygital-economy-69d5793a7108" title="">create from scratch and bridge legacy value</a> to decentralize both power and capital towards the parallel worlds.</p>
            <p>We are builders of exponential value across the blockchain.</p>
        </div>
    </div>
    <br/><br/><br/><br/>
    <h3>We’re always open to meet and partner with forward-thinking individuals and collectives. Contact us and let’s make some history. </h3>
    <br/><br/>
    <Button
        className="about-cta button"
        size="large"
    >
        <a href="https://2s51z649e1o.typeform.com/to/DtsvcixQ" title="Apply Now" target="_blank" rel="noreferrer">Apply Now</a>
    </Button>
    <Modal maskClosable centered className='nft-viewer-modal' visible={isModalVisible} onOk={hideModal} closable={false} cancelButtonProps={{className: "cancel-button-modal"}}>
        <img src={nftInView.image} alt={nftInView.title}/>
        <div className='nft-metadata'>
            <h3>{nftInView.title}</h3>
            <hr/><br/>
            <strong>Collection: </strong>{nftInView.collection}<br/>
            <strong>Token ID: </strong>{nftInView.number}<br/>
            <strong>Owner: </strong><a href={nftInView.owner} title='Check on Chain' target="_blank" rel="noreferrer">Check on Chain</a><br/>
            <strong>Contract Address: </strong><small>{nftInView.contract}</small><br/>
            <strong>Blockchain: </strong>{nftInView.chain}<br/>
            <strong>Token Standard: </strong>ERC-721<br/>
        </div>
    </Modal>
</div>
}

export default withRouter(About);