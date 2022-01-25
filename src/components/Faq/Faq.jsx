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
            <h1><strong>FAQs</strong></h1>
            <Collapse accordion>
                
                <Panel header="How to Mint a NFT" key="1">
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

                <Panel header="What is the Contract Address?" key="2">
                    <Address avatar="left" copyable address={contractAddress} size={8} />
                </Panel>

            </Collapse>
        </div>

}
export default Faq;