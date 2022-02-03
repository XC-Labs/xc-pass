import { Card } from 'antd';
import { NavLink } from "react-router-dom";
import nft from '../../assets/nft.jpg';

const Collections = () => {
    const { Meta } = Card;
    return <div className="collections-container">
        <h1 className="extra-big">Collections</h1>
        <div className='collections-inner-container'>
            <NavLink to="/collections/xc-pass">
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={nft} />}
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

export default Collections;