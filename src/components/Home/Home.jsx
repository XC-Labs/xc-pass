import { Button } from "antd";
import { NavLink } from "react-router-dom";
import logo from '../../assets/xcpass-logo-big.png';

const Home = (props) => {
    const { isAuthenticated, isWhitelistRegActive } = props;
    if(isWhitelistRegActive){
        return <div className="home">
        <h1 className="extra-big"><span>We're</span><br/><img src={logo} alt="XC Pass logo" /></h1>
        <h2>We are a chain-agnostic NFT laboratory. Let’s build and scale together the next generation of phygital assets.</h2>
        <Button
            className="main-cta button"
            size="large"
            disabled={isAuthenticated ? false : true}
        >
        <NavLink to="/whitelist">Register in the Whitelist</NavLink>
        </Button>
        <a href="https://maw.dev" className="secondary-cta" title="5 reasons to mint a XC Pass">5 reasons to mint a XC Pass</a>
    </div>
    }else{
        return <div className="home">
                    <h1 className="extra-big"><span>We're</span><br/><img src={logo} alt="XC Pass logo" /></h1>
                    <h2>We are a chain-agnostic NFT laboratory. Let’s build and scale together the next generation of phygital assets.</h2>
                    <Button
                        className="main-cta button"
                        size="large"
                        disabled={isAuthenticated ? false : true}
                    >
                    <NavLink to="/mint">Mint your XC Pass</NavLink>
                    </Button>
                    <a href="https://maw.dev" className="secondary-cta" title="5 reasons to mint a XC Pass">5 reasons to mint a XC Pass</a>
                </div>
    }
} ;
export default Home;
