import { useEffect } from "react";
import { Card } from 'antd';
import { NavLink, withRouter } from "react-router-dom";
import nft from '../../assets/xc-pass.mp4';

const Collections = (props) => {
    const { registerPageView } = props;
    useEffect(() => {
        document.title = "Collections | XC Labs";  
        registerPageView("/collections" + window.location.search);
    }, [registerPageView]);
    const { Meta } = Card;
    return <div className="collections-container">
        <h1 className="extra-big">Collections</h1>
        <div className='collections-inner-container'>
            <NavLink to="/collections/xc-pass">
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<video src={nft} muted={true} autoPlay={true} loop={true} controls={false}></video>}
                >
                    <Meta title="XC Pass" />
                </Card>
            </NavLink>
            <Card
                style={{ width: 240 }}
            >
                <Meta title="XC Agents" description="(Coming Soon)" />
            </Card>
            <Card
                style={{ width: 240 }}
            >
                <Meta title="Axoloots" description="(Coming Soon)" />
            </Card>
            <Card
                style={{ width: 240 }}
            >
                <Meta title="ETHquilla" description="(Coming Soon)" />
            </Card>
        </div>
    </div>
}

export default withRouter(Collections);