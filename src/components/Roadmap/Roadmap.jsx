import { useEffect} from "react";
import { Timeline, Button } from 'antd';
import { withRouter } from "react-router-dom";
import xcpass1 from '../../assets/roadmap/xc_pass_1.jpg';
import xcpass2 from '../../assets/roadmap/xc_pass_2.jpg';
import axo01 from '../../assets/roadmap/axo01.jpg';
import axo02 from '../../assets/roadmap/axo02.jpg';
import axo03 from '../../assets/roadmap/axo03.jpg';

const Roadmap = (props) => {
    const { registerPageView } = props;
    useEffect(() => {
        document.title = "Roadmap | XC Labs";
        registerPageView("/roadmap" + window.location.search);
    }, [registerPageView]);

    return <div className="roadmap-container">

                <div className="roadmap-heading">
                    <h1 className='extra-big'>Roadmap</h1>
                    <h2>Our work is focused on exploring the boundaries of NFT technology. Being part of our community means being part of the future.</h2>
                </div>

                <Timeline>

                    <Timeline.Item color="#FF7C11">
                        <h2>Q1 2022</h2>
                    </Timeline.Item>

                    <Timeline.Item color="#5900ff">
                        <h3>Mar 22 / Investment & Market Alphas</h3>
                        <p>Our crypto-savvy team is composed of Binance, Bitso & Amber Group ex-operators, traders, crypto investors, and solidity developers, however, our extended team also includes members who came from the Venture Capital world, from local unicorns like Cabify, Kavak, PayClip, Bitso, and top companies such as Walmart, American Express and BBVA. </p>
                        <p>We plan to use our experience building and scaling up products to support and connect with top projects in the region and unlock valuable partnerships. As a member, you can expect early access to Gaming Projects, Seed Rounds, Beta Products, and more.</p>
                        <p>We’ll announce the details soon, but we can guarantee that we already have four amazing projects in the pipeline.</p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>
                    
                    <Timeline.Item color="#FF7C11">
                        <h2>Q2 2022</h2>
                    </Timeline.Item>

                    <Timeline.Item color="#5900ff">
                        <h3>April 22 / NFT Collection: XC Pass by XC Labs powered by Avalanche</h3>
                        <p>XC-Pass unlocks access to our community, investment alphas on top LATAM projects, the opportunity to get whitelisted to the NFTs Collections by our amazing partners, and future Airdrops from our operations and partnerships.</p>
                        <p>As we believe in equality, each pass will have the same level of benefits distributed proportionally. However, you can buy more passes to leverage your governance power in our future DAO, increase your perks in our community and even unravel additional levels of access after the merge that we plan to launch later this year. More to be announced.</p>
                        <div className='project-images'>
                            <img src={xcpass1} alt="NFT Collection: XC Pass by XC Labs Drop"/>
                            <img src={xcpass2} alt="NFT Collection: XC Pass by XC Labs Drop"/>
                        </div>
                    </Timeline.Item>
                    
                    <Timeline.Item color="#5900ff">
                        <h3>May 22 / NFT Collection: Axoloots Drop powered by Ethereum</h3>
                        <p>Axoloots is a ‘solarpunk fairytale’, a speculative-futuristic fiction of Mexico’s ancient civilizations and cities protagonized by its mythic axolotls. A story through which we can remember our future struggles based on our past and present choices, not just as societies, but as a planet. </p>
                        <p>AXOs will be our first entrance to explore a more diverse and hybrid approach to the NFT world, this is not only a world-class PFP collection designed by the well-known street artist <a href="https://twitter.com/netoplasma" title="netoplasma">netoplasma</a>; but also will serve as the foundation for a self-preservation initiative that will have a direct impact on creating value for environmental services.</p>
                        <div className='project-images'>
                            <img src={axo01} alt="NFT Collection: Axoloots Drop"/>
                            <img src={axo02} alt="NFT Collection: Axoloots Drop"/>
                            <img src={axo03} alt="NFT Collection: Axoloots Drop"/>
                        </div>
                    </Timeline.Item>

                    <Timeline.Item color="#5900ff">
                        <h3>Jun 22 / XCVerse Drops 1 & 2</h3>
                        <p>LatinAmerica is full of great talent ready to join the Web3 revolution. As our community grows, we plan to share the knowledge and technology to support upcoming Web3-artists who are leading their fields and putting the region on top. </p>
                        <p>We’ve done our homework by curating and inviting a list of artists that will be honorary holders of the XC Pass collection and by being part of this journey since day 0, they will be ready to share their talent as soon as April 2022. </p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>

                    <Timeline.Item color="#FF7C11">
                        <h2>Q3 2022</h2>
                    </Timeline.Item>

                    <Timeline.Item color="#5900ff">
                        <h3>Jul 22 / Investment & Market Alpha Tool</h3>
                        <p>As we continue to unlock value to our Pass & Agents holders, the team will also build the strongest network NFT-based projects from the region. We´ve collectively invested and supported more than 12 companies for the past four years, from fintech to retail and health.</p>
                        <p>Many planned an indirect approach to Web3, starting with an IRL business model while preparing their tech and corporate org for the blockchain world. That means that real-world NFT use cases are being scheduled to be launched in the form of revolutionary web3 startups.</p>
                        <p>How does XC plan to be a part of? In several ways, we will build a tool to track those projects early, invite them to interact with the XC community, and support them in their early investment rounds. </p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>

                    <Timeline.Item color="#5900ff">
                        <h3>Jul 22 / NFT Collection: XC Agents by XC Labs powered by a privacy-focused chain</h3>
                        <p>The future of the blockchain space will be multichain, that's why we’re a chain agnostic laboratory of NFT ideas. In line with this vision, our XC Agents will be our second PFP collection launched on a privacy-centric chain. Why? Because for some cases, privacy and data protection will be the key.</p>
                        <p>XC Agents will unlock extra perks to our pass holders and will serve as the signature access to the first entrance to the Metaverse and social media network experience that we´re planning to build.</p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>
                    
                    <Timeline.Item color="#5900ff">
                        <h3>Aug 22 / XCVerse Drops 3 & 4</h3>
                        <p>XCVerse will be the community platform where creators will showcase their work, and introduce them to the world.</p>
                        <p>What kind of Drops can you expect? Well, fast your bells, we have several serious and highly creative people in the XC network, from Grammy-winner artists, triple-a game developers, art collectors, and even a never-seen work from one of the most well-known Mexican artists of all time. More news and a detailed website soon. </p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>
                    
                    <Timeline.Item color="#5900ff">
                        <h3>Aug 22 / XC Pass Ultimate Merge for OGs</h3>
                        <p>The second part of the year will be critical for the NFT revolution; as more and more communities consolidate as DAOs, protocols, or new hybrid structures, XC plans to follow their paths. </p>
                        <p>Have you heard about NFT mergers? We´re planning to mix and match the NFT collections that were previously launched to push even more use cases and unlock extra benefits for the holders. XC Passes merging into a new level will be the beginning. However, XC Agents and drops 1 to 4 from our XCVerse friends may also be considered into the merger.</p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>
                    
                    <Timeline.Item color="#5900ff">
                        <h3>Sep 22 / XCVerse Drops 5 & 6 & IRL Experience</h3>
                        <p>Beyond digital assets, NFTs will also liberate other use cases for phygital assets, for these drops, we will focus on exploring the limits between the on and off-chain use for NFTs.</p>
                        <p>In the early community of XC we also count on real estate developers, factory owners, FMCGs suppliers, and robotic and IOT experts who will contribute to the design of the third generation of NFTs collections. Join early, and stay tuned for what is coming.</p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>
                    
                    <Timeline.Item color="#FF7C11">
                        <h2>Q4 2022</h2>
                    </Timeline.Item>

                    <Timeline.Item color="#5900ff">
                    <h3>Oct 22 / XC Incubated Projects Announcement</h3>
                        <p>As a Laboratory, we´re pursuing a greater vision where NFTs can showcase better and improved real-life use cases in the intersection of our current and future way of living. We already have one project where we´ve been putting a lot of effort for the past 7 months (see the next point), however, there are other use cases that our community is already working on. </p>
                        <p>By this time of the year, we will disclose the long-term vision of our initiative, where the combination of a stronger community, great partners, and Web3 tools, will become leading technologies to address some of the greatest challenges in our modern living. </p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>

                    <Timeline.Item color="#5900ff">
                        <h3>Nov 22 / NFT + DeFi Platform: Symbiotik ICO</h3>
                        <p>As we’ve seen with other great NFT communities such as BAYC, Pixel Vault, or Clonex, the power of the NFTs resides not only in the way art and value are distributed but also in the next generation of platforms for community building, media decentralization, shared ownership and many more complex mechanisms that NFT technology can nourish, host and scale.</p>
                        <p>In that same note we introduce Symbiotik which is a decentralized platform that supports a new generation of digital assets and applications to create a model of value generation through environmental services. From CO2 sequestration to water & food provisioning and anything in between. Learn more.</p>
                        <div className='project-images'>
                        </div>
                    </Timeline.Item>
                    
                    <Timeline.Item color="#FF7C11">
                        <h2>2023 and Beyond</h2>
                        <p>Building and scaling tech initiatives are hard, but we believe that we´re on the edge of the massive adoption of these revolutionary technologies.</p>
                        <p>For those that, like us, have been in crypto for a while, we all know that a week in crypto feels like a month in real life, so for future development, we can guarantee that for the years to come, we will keep delivering towards our vision of bringing real-world use cases to incentivize the adoption and usage of NFTs.</p>
                    </Timeline.Item>
                </Timeline>

                <Button
                    className="main-cta button"
                    size="large"
                >
                    <a href="https://discord.com/invite/mTYgkkeA28" title="Join Us on Discord" target="_blank" rel="noreferrer">Join Us on Discord</a>
                </Button>
            </div>
}

export default withRouter(Roadmap);