import {Button} from 'antd';
import bio from '../../assets/bio.png';

const Team = () => {
    return <div className="team-container">
    <h1>Meet The Team</h1>
    <h1 className="extra-big">
        We are<br/><strong>Dreamers</strong>
    </h1>
    <h2>Collectively, we have 100 years of experience building and scaling tech products.</h2>

    <div className="team-block-container">
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>joxx</h4>
                <h5>joxx | xc labs | symbiotik#8416</h5>
                <p>gm</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>alex</h4>
                <h5>errederruiz#8614</h5>
                <p>creative chief</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>maw</h4>
                <h5>mawmawmaw#0600</h5>
                <p>head of tech</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>rox</h4>
                <h5>roxpi122#2979</h5>
                <p>head of research</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>ram&oacute;n</h4>
                <h5>Roma / XC-Labs#6488</h5>
                <p>counseling & advisory</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>cheko</h4>
                <h5>Chekov#8800</h5>
                <p>counseling & advisory</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>Antonio</h4>
                <h5>antoniohdz90#3861</h5>
                <p>Trading Desk</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>alex</h4>
                <h5>luis96pack#0810</h5>
                <p>community builder</p>
            </div>
        </div>
        <div className="team-block">
            <div className="team-block-image">
                <img src={bio} alt="Bio" />
            </div>
            <div className="team-block-info">
                <h4>Juvenal</h4>
                <h5>Juvencrypto#2835</h5>
                <p>community builder</p>
            </div>
        </div>
    </div>
    <h2>We’re building our team and would love to hear from you. Contact us and let’s make some history. </h2>
    <Button
        className="about-cta button"
        size="large"
    >
        Apply Now
    </Button>
</div>
}

export default Team;