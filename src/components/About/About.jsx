import {Button} from 'antd';

const About = () => {
    return <div className="about-container">
    <h1>What We Do</h1>
    <h1 className="extra-big">
        <strong>Reality</strong> is what we want it to be.
    </h1>
    <h2>Our Assessment</h2>
    <p>Development spaces today aren’t entirely physical. Virtual and augmented reality playgrounds are now enhancers of our human experience and we use it to evolve our nature.</p>

    <div className="about-block">
        <div className="nft-wrapper">

        </div>
        <div className="content-wrapper">
            <h1 className="extra-big">Iterate</h1>
            <p>In-house exploration of the future of blockchain technology through NFTs. We aim to build products for human adoption and virtual rebellion.</p>
        </div>
    </div>
    <div className="about-block">
        <div className="content-wrapper">
            <h1 className="extra-big">Acce-<br/>lerate</h1>
            <p>Massify the future through our close kin: the Latinamerican Region. We leverage and push to market projects from the local to the metaversal.</p>
        </div>
        <div className="nft-wrapper">
            
        </div>
    </div>
    <div className="about-block">
        <div className="nft-wrapper">
            
        </div>
        <div className="content-wrapper">
            <h1 className="extra-big">Multi-<br/>ply</h1>
            <p>Resource & value allocation. We create from scratch and bridge legacy value to decentralize both power and capital towards the parallel worlds.</p>
        </div>
    </div>
    <hr/>
    <br/><br/>
    <p>We’re always open to meet and partner with forward-thinking individuals and collectives. Contact us and let’s make some history. </p>
    <Button
        className="about-cta button"
        size="large"
    >
        Apply Now
    </Button>
</div>
}

export default About;