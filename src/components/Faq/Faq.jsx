import { useEffect } from "react";
import { Steps, Collapse, Button } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { useChain } from "react-moralis";
import Address from "components/Address/Address";

const Faq = (props) => {
    const { contractAddress, appChainIdHex, registerPageView } = props;
    const { Step } = Steps;
    const { Panel } = Collapse;
    useEffect(() => {
        document.title = "FAQs | XC Labs";  
        registerPageView("/faq" + window.location.search);
    }, [registerPageView]);

    const { switchNetwork } = useChain();

    const addAvalancheNetwork = async () => {
        try {
            await switchNetwork(appChainIdHex);
        } catch (error) {
            alert(error.message);
        }
    }

return <div className="how-to-container">
            <h1 className="extra-big">FAQs</h1>
            <Collapse accordion>
                <Panel header="How to Register in the Whitelist" key="1">
                    <Steps direction="vertical">
                        <Step status="process" title="Install a Wallet" description={<p>If you don't have a wallet, we recommend <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</ a>. You can  <a href="https://metamask.io/" target="_blank" rel="noreferrer">download it here</a> and create an account. Be sure to keep your keys safe!</p>}/>
                        <Step status="process" title="Switch to Avalanche Mainnet Network" description={<p>Switch to Avalanche Mainnet Network. If you don't have the Avalanche Mainnet Network on your wallet, you can add it by clicking the following button: <Button onClick={addAvalancheNetwork}>Add Avalanche to Metamask</Button></p>}/>
                        <Step status="process" title="Authenticate" description={<p>Authenticate with your wallet using the button in the top right of the site (we currently support Metamask and WalletConnect). Once you've done so, go to the <NavLink to="/whitelist">Whitelist Page</NavLink>.</p>}/>
                        <Step status="process" title="Register" description={<p>Now, be sure to have enough AVAX to cover gas for the registrations (registration has no cost, only gas).</p>} />
                    </Steps>
                </Panel>
                <Panel header="How does the Whitelist work?" key="2">
                    <p>The Whitelist registration will be open for a short period of time. Wallets registered in the Whitelist will be able to mint their XC Passes in a date prior to the public sale. There is no current limit to the amount of wallets that can be registered in the Whitelist, which means that if enough people register, all the XC Passes passes could be sold during pre-sale.</p>
                </Panel>
                <Panel header="How to Mint an NFT" key="3">
                    <Steps direction="vertical">
                        <Step status="process" title="Install a Wallet" description={<p>If you don't have a wallet, we recommend <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</a>. You can  <a href="https://metamask.io/" target="_blank" rel="noreferrer">download it here</a> and create an account. Be sure to keep your keys safe!</p>}/>
                        <Step status="process" title="Switch to Avalanche Mainnet Network" description={<p>Switch to Avalanche Mainnet Network. If you don't have the Avalanche Mainnet Network on your wallet, you can add it by clicking the following button: <Button onClick={addAvalancheNetwork}>Add Avalanche to Metamask</Button></p>}/>
                        <Step status="process" title="Authenticate" description={<p>Authenticate with your wallet using the button in the top right of the site (we currently support Metamask and WalletConnect). Once you've done so, go to the <NavLink to="/mint">Minting Page</NavLink>.</p>}/>
                        <Step status="process" title="Mint your XC Pass" description={<p>First, be sure to have at least 1 AVAX (+gas) to be able to mint 1 XC Pass. You can buy a maximum of 50 passes.</p>} />
                    </Steps>
                </Panel>
                <Panel header="What is XC Labs?" key="4">
                    <p>XC Labs is a chain-agnostic NFT laboratory based in Latam. We build, cultivate and scale NFT projects. 
                    Collectively, we have 100 years of experience building and scaling tech products, and out team have worked in billion dollar companies, projects and products, in companies such as Binance, Amber, Cabify, Bolt, BBVA, Clip, Kavak, and others.</p>
                </Panel>
                <Panel header="How is XC different from other NFT communities?" key="5">
                    <p>We´re more than that. NFTs will be the core of the Web3 revolution, and we plan to build several projects for different industries and use cases. Always using NFTs as a baseline of the main core-functionalities. We believe in the flexibility and convenience of owning NFTs as a layer or property, identity, and more important, as a reflection of constant changes in our environment, economy and society.</p>
                    <p>Our lives changes every day, our demands and needs also changes over time, why we should remain static? There´s no reason why, so we´re aiming to use the flexibility of the NFTs core design to revoult the ownership and value-creation economy.</p>
                </Panel>
                <Panel header="What does your “Chain-Agnostic” approach means?" key="6">
                    <p>As blockchain technology gets massively adopted, several chains will serve different features, industries and even communites. We aim to reach the true potential of the ecosystem through all the collective work that is being held under all of the projects available.</p>
                </Panel>
                <Panel header="Who's the team behind?" key="7">
                    <p>Visit the Team Section</p>
                </Panel>
                <Panel header="What is the XC Pass functionality? " key="8">
                    <p>The XC Pass Mint will serve as the access for any in our community to join the primer efforts towards building the foundational basis of our protocols and platforms. As our products and presence consolidate, the amount of XC Pass that got minted will be merged into an Access Card for different tiers of benefits. The more XC Passes a wallet holds, better rights and permission it will wield. Such as discounted private sales, prime access to upcoming NFT-Drops from Latin American digital artists, first in line airdrops, and early investments in Latam Blockchain projects.</p>
                </Panel>
                <Panel header="Is XC Labs a DAO? " key="9">
                    <p>Not yet but beware, we will be eventually. XC Passes will be the irect access to it.</p>
                </Panel>
                <Panel header="Is XC Labs a Launchpad? " key="10">
                    <p>Not yet but beware, we will eventually be. We have been working for the past 18 months designing and building our approach to market through NFT technology. XC Passes will be the irect access to the Launchpad.</p>
                </Panel>
                <Panel header="What is a phygital asset? " key="11">
                    <p>We define phygital assets as the kind that lives both in the physical space that we all share and the digital worlds and metaverses that we are building. As an example, tokenizing nature or debt from IRL and transfering this value to the blockchain.</p>
                </Panel>
                <Panel header="What is the Contract Address?" key="12">
                    <Address copyable address={contractAddress}  />
                </Panel>
            </Collapse>
        </div>

}
export default withRouter(Faq);