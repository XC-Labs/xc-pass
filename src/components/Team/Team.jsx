import {Button} from 'antd';
import joxx from '../../assets/team/joxx.jpg';
import alex from '../../assets/team/alex.jpg';
import maw from '../../assets/team/maw.jpg';
import rox from '../../assets/team/rox.jpg';
import cheko from '../../assets/team/cheko.jpg';
import roma from '../../assets/team/roma.gif';
import luis from '../../assets/team/luisvega.jpg';
import antonio from '../../assets/team/antonio.jpg';
import chainz from '../../assets/team/chainz.jpg';
import juvenal from '../../assets/team/juvenal.jpg';

const Team = () => {
    return <div className="team-container">
        <h1 className="extra-big">
            We are<br/>Dreamers
        </h1>
        <h2>Collectively, we have 100 years of experience building and scaling tech products.</h2>
        <br/><br/>
        <h2>Meet the team:</h2>

        <div className="team-block-container">
            <div className="team-block">
                <div className="team-block-image">
                    <img src={joxx} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Joxx</h4>
                    <h5>joxx | xc labs | symbiotik#8416</h5>
                    <p>CEO</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={alex} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Alex</h4>
                    <h5>errederruiz#8614</h5>
                    <p>Creative Chief</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={maw} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Maw</h4>
                    <h5>mawmawmaw#0600</h5>
                    <p>Head of Tech</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={rox} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Rox</h4>
                    <h5>roxpi122#2979</h5>
                    <p>Head of Research</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={roma} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Ram&oacute;n</h4>
                    <h5>Roma / XC-Labs#6488</h5>
                    <p>Strategy & Advisory</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={cheko} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Cheko</h4>
                    <h5>Chekov#8800</h5>
                    <p>Strategy & Advisory</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={antonio} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Antonio</h4>
                    <h5>antoniohdz90#3861</h5>
                    <p>Trading Desk</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={chainz} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Chainz</h4>
                    <h5>#</h5>
                    <p>Trading Desk</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={luis} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Luis</h4>
                    <h5>luis96pack#0810</h5>
                    <p>Community Builder</p>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={juvenal} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Juvenal</h4>
                    <h5>Juvencrypto#2835</h5>
                    <p>Community Builder</p>
                </div>
            </div>
        </div>
        <h2>We’re building our team and would love to hear from you. Contact us and let’s make some history. </h2>
        <br/><br/>
        <Button
            className="about-cta button"
            size="large"
        >
            Apply Now
        </Button>
    </div>
}

export default Team;