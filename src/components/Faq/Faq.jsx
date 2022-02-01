import { Card, Row, Col, Collapse } from "antd";
import { NavLink } from "react-router-dom";
import metamask from '../../assets/metamask.png';
import avalanche from '../../assets/avalanche.png';
import authenticate from '../../assets/authenticate.png';
import Address from "components/Address/Address";

const Faq = (props) => {
    const { Meta } = Card;
    const { Panel } = Collapse;
    const {contractAddress} = props;

return <div className="how-to-container">
            <h1>FAQs</h1>
            <Collapse accordion>
                
                <Panel header="What is XC Labs?" key="1">
                    <p>XC Labs is a chain-agnostic NFT laboratory based in Latam. We build, cultivate and scale NFT projects. 
                    Collectively, we have 100 years of experience building and scaling tech products, and out team have worked in billion dollar companies, projects and products, in companies such as Binance, Amber, Cabify, Bolt, BBVA, Clip, Kavak, and others.</p>
                </Panel>
                <Panel header="How is XC different from other NFT communities?" key="2">
                    <p>We´re more than that. NFTs will be the core of the Web3 revolution, and we plan to build several projects for different industries and use cases. Always using NFTs as a baseline of the main core-functionalities. We believe in the flexibility and convenience of owning NFTs as a layer or property, identity, and more important, as a reflection of constant changes in our environment, economy and society.</p>
                    <p>Our lives changes every day, our demands and needs also changes over time, why we should remain static? There´s no reason why, so we´re aiming to use the flexibility of the NFTs core design to revoult the ownership and value-creation economy.</p>
                </Panel>
                <Panel header="What does your “Chain-Agnostic” approach means?" key="3">
                    <p>As blockchain technology gets massively adopted, several chains will serve different features, industries and even communites. We aim to reach the true potential of the ecosystem through all the collective work that is being held under all of the projects available.</p>
                </Panel>
                <Panel header="Who's the team behind?" key="4">
                    <p>Visit the Team Section</p>
                </Panel>
                <Panel header="What is the XC Pass functionality? " key="5">
                    <p>The XC Pass Mint will serve as the access for any in our community to join the primer efforts towards building the foundational basis of our protocols and platforms. As our products and presence consolidate, the amount of XC Pass that got minted will be merged into an Access Card for different tiers of benefits. The more XC Passes a wallet holds, better rights and permission it will wield. Such as discounted private sales, prime access to upcoming NFT-Drops from Latin American digital artists, first in line airdrops, and early investments in Latam Blockchain projects.</p>
                </Panel>
                <Panel header="Is XC Labs a DAO? " key="6">
                    <p>Not yet but beware, we will be eventually. XC Passes will be the irect access to it.</p>
                </Panel>
                <Panel header="Is XC Labs a Launchpad? " key="7">
                    <p>Not yet but beware, we will eventually be. We have been working for the past 18 months designing and building our approach to market through NFT technology. XC Passes will be the irect access to the Launchpad.</p>
                </Panel>
                <Panel header="What is a phygital asset? " key="8">
                    <p>We define phygital assets as the kind that lives both in the physical space that we all share and the digital worlds and metaverses that we are building. As an example, tokenizing nature or debt from IRL and transfering this value to the blockchain.</p>
                </Panel>
                <Panel header="How to Mint a NFT" key="9">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={8}>
                        <Card bordered={false} cover={<img alt="metamask" src={metamask} />}>
                            <Meta title="1. Install Metamask" />
                            <p>If you don't have <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</a> installed, first <a href="https://metamask.io/" target="_blank" rel="noreferrer">download it</a> and create an account. Be sure to keep your keys safe!</p>
                        </Card>
                        </Col>
                        <Col className="gutter-row" span={8}>
                        <Card bordered={false} cover={<img alt="avalanche" src={avalanche} />}>
                            <Meta title="2. Switch to Fuji Testnet" />
                            <p>Switch to Fuji (Avalanche Testnet) and be sure to have some Test AVAX. If you need some, please visit an AVAX Faucet like: <a href="https://faucet.avax-test.network/" target="_blank" rel="noreferrer">Fuji Avalanche Testnet Faucet</a></p>
                        </Card>
                        </Col>
                        <Col className="gutter-row" span={8}>
                        <Card bordered={false} cover={<img alt="authenticate" src={authenticate} />}>
                            <Meta title="3. Authenticate" />
                            <p>Authenticate with Metamask using the button in the top right of the site. Once you've done so, go to the <NavLink to="/mint">Minting Page</NavLink>.</p>
                        </Card>
                        </Col>
                    </Row>
                </Panel>
                <Panel header="What is the Contract Address?" key="10">
                    <Address avatar="left" copyable address={contractAddress} size={8} />
                </Panel>
            </Collapse>
        </div>

}
export default Faq;