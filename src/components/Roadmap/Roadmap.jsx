import xcpass1 from '../../assets/roadmap-render-xc_pass/xc_pass_2.jpg';
import xcpass2 from '../../assets/roadmap-render-xc_pass/xc_pass_5.jpg';
import xcpass3 from '../../assets/roadmap-render-xc_pass/xc_pass_6.jpg';
import axo01 from '../../assets/roadmap-axoloots/01.jpg';
import axo02 from '../../assets/roadmap-axoloots/02.jpg';
import axo03 from '../../assets/roadmap-axoloots/03.jpg';
import sym01 from '../../assets/roadmap-symbiotik/01.jpg';
import sym02 from '../../assets/roadmap-symbiotik/02.jpg';

export default function Roadmap(props) {
    return <div className="roadmap-container">
                <div className="roadmap-heading">
                    <h1 className='extra-big'>Roadmap</h1>
                    <h2>Our work is focused on exploring the boundaries of NFT technology. Being part of our community means being part of the future.</h2>
                </div>
                <h2>Q1 2022</h2>
                <div className='xc-project'>
                    <span className='project-separator'>_</span>
                    <h3>NFT Collection: XC Pass by XC Labs Drop</h3>
                    <p>XC-Pass unlocks access to our community, early investment opportunities, whitelist for our NFTs, and a spot in our trading desk to earn additional yield on your investments. Buy more passes to leverage your governance power in our future DAO and increase your benefits in our community.</p>
                    <div className='project-images'>
                        <img src={xcpass1} alt="NFT Collection: XC Pass by XC Labs Drop"/>
                        <img src={xcpass2} alt="NFT Collection: XC Pass by XC Labs Drop"/>
                        <img src={xcpass3} alt="NFT Collection: XC Pass by XC Labs Drop"/>
                    </div>
                </div>
                <div className='xc-project'>
                    <span className='project-separator'>_</span>
                    <h3>NFT Collection: XC Agents Drop</h3>
                    <p>Coming Soon…</p>
                    <div className='project-images'>
                    </div>
                </div>
                <div className='xc-project'>
                    <span className='project-separator'>_</span>
                    <h3>NFT Collection: Axoloots Drop</h3>
                    <p>Axoloots is a ‘solarpunk fairytale’, a speculative-futuristic fiction of Mexico’s ancient civilizations and cities protagonized by its mythic axolotls. A story through which we can remember our future struggles based on our past and present choices, not just as societies, but as a planet. <a href="https://axoloots.com/" title="Learn more" target="_blank" rel="noreferrer">Learn more.</a></p>
                    <div className='project-images'>
                        <img src={axo01} alt="NFT Collection: Axoloots Drop"/>
                        <img src={axo02} alt="NFT Collection: Axoloots Drop"/>
                        <img src={axo03} alt="NFT Collection: Axoloots Drop"/>
                    </div>
                </div>
                <div className='xc-project'>
                    <span className='project-separator'>_</span>
                    <h3>Early Bird Investment: Maya Protocol</h3>
                    <p>Maya is a decentralised liquidity protocol that enables the fast and efficient exchange of cryptocurrencies without intermediaries. One of its most important features is that it is multi-chain, which means that you can exchange digital assets from different blockchains.
                    Maya's technical design is based on THORChain as Maya was born as an offshoot of this revolutionary protocol.</p>
                    <p>It seeks to consolidate the philosophy of economic independence and bring security and liquidity to any user's wallet without the need to tie the value of assets.  <a href="https://axoloots.com/" title="Learn more" target="_blank" rel="noreferrer">Learn more.</a></p>
                    <div className='project-images'>
                    </div>
                </div>
                <div className='xc-project'>
                    <span className='project-separator'>_</span>
                    <h3>Early Bird Investment: Kashin</h3>
                    <p>Symbiotik is a decentralized platform that supports a new generation of digital assets and applications to create a model of value generation through environmental services. From CO2 sequestration to water & food provisioning and anything in between. Learn more.</p>
                    <div className='project-images'>
                    </div>
                </div>
                <h2 className='h2-with-separator'>Q3 2022</h2>
                <div className='xc-project'>
                    <span className='project-separator'>_</span>
                    <h3>NFT + DeFi Platform: Symbiotik ICO</h3>
                    <p>Symbiotik is a decentralized platform that supports a new generation of digital assets and applications to create a model of value generation through environmental services. From CO2 sequestration to water & food provisioning and anything in between. Learn more.</p>
                    <div className='project-images'>
                        <img src={sym01} alt="NFT + DeFi Platform: Symbiotik ICO"/>
                        <img src={sym02} alt="NFT + DeFi Platform: Symbiotik ICO"/>
                    </div>
                </div>

            </div>
}