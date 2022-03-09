import { useEffect} from "react";
import {Button} from 'antd';
import { withRouter } from "react-router-dom";
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

const Team = (props) => {
    const { registerPageView } = props;
    useEffect(() => {
        document.title = "About Our Team | XC Labs";  
        registerPageView("/meet-the-team" + window.location.search);
    }, [registerPageView]);

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
                    <p>CEO</p>
                    <a href="https://www.linkedin.com/in/joxgallardo/" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={alex} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Alex</h4>
                    <p>Creative Chief</p>
                    <a href="https://xc-labs.com/#/meet-the-team" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={maw} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Maw</h4>
                    <p>Head of Tech</p>
                    <a href="https://maw.dev/" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={rox} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Rox</h4>
                    <p>Head of Research</p>
                    <a href="https://xc-labs.com/#/meet-the-team" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={roma} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Ram&oacute;n</h4>
                    <p>Strategy & Advisory</p>
                    <a href="https://www.linkedin.com/in/rmnescobar/" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={cheko} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Cheko</h4>
                    <p>Strategy & Advisory</p>
                    <a href="https://xc-labs.com/#/meet-the-team" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={antonio} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Antonio</h4>
                    <p>Trading Desk</p>
                    <a href="https://xc-labs.com/#/meet-the-team" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={chainz} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Chainz</h4>
                    <p>Trading Desk</p>
                    <a href="https://xc-labs.com/#/meet-the-team" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={luis} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Luis</h4>
                    <p>Community Builder</p>
                    <a href="https://xc-labs.com/#/meet-the-team" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
            <div className="team-block">
                <div className="team-block-image">
                    <img src={juvenal} alt="Bio" />
                </div>
                <div className="team-block-info">
                    <h4>Juvenal</h4>
                    <p>Community Builder</p>
                    <a href="https://xc-labs.com/#/meet-the-team" title="About" target="_blank" rel="noreferrer" className='team-about-button'>About Me</a>
                </div>
            </div>
        </div>
        <h2>We’re building our team and would love to hear from you. Contact us and let’s make some history. </h2>
        <br/><br/>
        <Button
            className="about-cta button"
            size="large"
        >
            <a href="https://2s51z649e1o.typeform.com/to/DtsvcixQ" title="Apply Now" target="_blank" rel="noreferrer">Apply Now</a>
        </Button>
    </div>
}

export default withRouter(Team);