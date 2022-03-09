import { useEffect } from "react";
import { Button } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import Account from "../Account/Account";
import logo from '../../assets/xclabs-logo.png';

const renderedMainCta = (props) => {
    const { chainId, appChainIdHex, isAuthenticated, isWhitelistRegActive, isMintingPaused } = props;

    if(isAuthenticated){
        if(chainId?.toString().toLowerCase()===appChainIdHex?.toString().toLowerCase()){
            if(isWhitelistRegActive){
                return <>
                        <Button
                            className="main-cta button"
                            size="large"
                            disabled={isAuthenticated ? false : true}
                        >
                            <NavLink to="/whitelist">Whitelist Your Wallet!</NavLink>
                        </Button>
                            <NavLink to="/xc-pass" className="secondary-cta" title="5 reasons to mint a XC Pass">5 reasons to mint a XC Pass</NavLink>
                        </>
            }
            if(!isMintingPaused){
                return <>
                        <Button
                            className="main-cta button"
                            size="large"
                            disabled={isAuthenticated && !isMintingPaused ? false : true}
                        >
                            <NavLink to="/mint">Mint your XC Pass</NavLink>
                        </Button>
                            <NavLink to="/xc-pass" className="secondary-cta" title="5 reasons to mint a XC Pass">5 reasons to mint a XC Pass</NavLink>
                        </>
            }
        }else{
            return <Button
                        className="main-cta button"
                        size="large"
                    >
                        <NavLink to="/faq">Check Our FAQs</NavLink>
                    </Button>
        }
    }else{
        return <Account isMintingPaused={isMintingPaused}/>
    }
}
const Home = (props) => {
    const { registerPageView } = props;
    useEffect(() => {
        document.title = "Home | XC Labs";
        registerPageView('/' + window.location.search);
    }, [registerPageView]);

    return <div className="home">
        <h1 className="extra-big"><span>We're</span><br/><img src={logo} alt="XC Pass logo" /></h1>
        <h2>A chain-agnostic NFT laboratory.<br/>Let’s build and scale together the next generation of phygital assets.</h2>
        <br/><br/>
        {renderedMainCta(props)}
    </div>
} ;
export default withRouter(Home);