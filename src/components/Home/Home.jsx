import { Button } from "antd";
import { NavLink } from "react-router-dom";

const Home = (props) => {
    const { isAuthenticated, isWhitelistRegActive } = props;
    if(isWhitelistRegActive){
        return <div className="home">
        <h1>We are a chain-agnostic NFT laboratory. Let’s fund and build together a next generation of phygital assets.</h1>
        <Button
            className="home-cta button"
            size="large"
            disabled={isAuthenticated ? false : true}
        >
        <NavLink to="/whitelist">Register in the Whitelist</NavLink>
        </Button>
    </div>
    }else{
        return <div className="home">
                    <h1>We are a chain-agnostic NFT laboratory. Let’s fund and build together a next generation of phygital assets.</h1>
                    <Button
                        className="home-cta button"
                        size="large"
                        disabled={isAuthenticated ? false : true}
                    >
                    <NavLink to="/mint">Mint your XC Pass</NavLink>
                    </Button>
                    <a href="https://maw.dev" className="home-secondary-cta" title="5 reasons to mint a XC Pass">5 reasons to mint a XC Pass</a>
                </div>
    }
} ;
export default Home;
