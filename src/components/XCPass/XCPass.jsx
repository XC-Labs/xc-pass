import { Button } from "antd";
import { NavLink } from "react-router-dom";
import xcpass from '../../assets/xcpass.png';

export default function XCPass(props) {
    const { isAuthenticated, isWhitelistRegActive } = props;
    return <div className="pass-container">
                <div className="pass-heading">
                    <h2>Join our community, get future-ready.</h2>
                    <div style={{backgroundImage: `url(${xcpass})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "260px", height: "480px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px"}}>
                        <h1 className="extra-big">XC—PASS</h1>
                    </div>
                    <p><strong>XC-Pass</strong> unlocks access to our community, early investment opportunities, whitelist for our NFTs, and a spot in our trading desk to earn additional yield on your investments. Buy more passes to leverage your governance power in our future DAO and increase your benefits in our community.</p>

                    {isWhitelistRegActive &&
                        <Button
                            className="home-cta button"
                            size="large"
                            disabled={isAuthenticated ? false : true}
                        >
                            <NavLink to="/whitelist">Register in Whitelist</NavLink>
                        </Button>
                    }
                    {!isWhitelistRegActive &&
                        <Button
                            className="home-cta button"
                            size="large"
                            disabled={isAuthenticated ? false : true}
                        >
                            <NavLink to="/mint">Mint your XC Pass</NavLink>
                        </Button>
                    }
                </div>
                <hr/>
                <br/><br/>
                <h2>Reasons to mint a<br/><strong>XC Pass</strong></h2>
                <div className="reasons-container">
                    <div className="reason-container">
                        <h1 className="extra-big">1</h1>
                        <div className="reason">
                            <h3>Harness the power of the metaverse.</h3>
                            <p>Gain early access to all of the ecosystem projects. Your XC Pass will work as the Foundational Ticket for whitelists, private sales, ICOs and more.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="reason-container">
                        <h1 className="extra-big">2</h1>
                        <div className="reason">
                            <h3>Distributed fairly, rewarded exponentially.</h3>
                            <p>At the minting stage, all XC Passes will be equal and available to anyone. In the next stage XC Passes will be merged to assigned founders’ silos. The more XC Passes a wallet mints, the broader scope it will achieve.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="reason-container">
                        <h1 className="extra-big">3</h1>
                        <div className="reason">
                            <h3>Join the Latam blockchain revolution.</h3>
                            <p>As a key region for blockchain adoption, the next wave of products and services is being built here.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="reason-container">
                        <h1 className="extra-big">4</h1>
                        <div className="reason">
                            <h3>Reallocate your risk/Diversify your portfolio.</h3>
                            <p>Our approach brings legacy value into the virtual realm and also the other way around. This next frontier in crypto is the ultimate community, our home.</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="reason-container">
                        <h1 className="extra-big">5</h1>
                        <div className="reason">
                            <h3>Find your community.</h3>
                            <p>Reach out to a thriving group of like-minded people. We are the builders. We are the dreamers. We are the futurists. We are the –phygitals.</p>
                        </div>
                    </div>
                </div>
                <hr/>
                <br/><br/>
                <h2>Ready for the future?</h2>
                {isWhitelistRegActive &&
                    <Button
                        className="home-cta button"
                        size="large"
                        disabled={isAuthenticated ? false : true}
                    >
                        <NavLink to="/whitelist">Register in Whitelist</NavLink>
                    </Button>
                }
                {!isWhitelistRegActive &&
                    <Button
                        className="home-cta button"
                        size="large"
                        disabled={isAuthenticated ? false : true}
                    >
                        <NavLink to="/mint">Mint your XC Pass</NavLink>
                    </Button>
                }
            </div>
}