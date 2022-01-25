import { Card, Layout } from "antd";
import metamask from '../../assets/metamask.png';
import CustomHeader from "components/CustomHeader/CustomHeader";

const NoWallet = () => {
    const { Meta } = Card;
    return <Layout style={{ height: "100vh", overflow: "auto", backgroundColor: "#ffffff66" }}>
                <CustomHeader />
                <div className="content-wrap">
                  <Card bordered={false} cover={<img alt="metamask" src={metamask} />}>
                    <Meta title="Install Metamask" />
                    <p>Seems like you don't have <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</a> installed. Please <a href="https://metamask.io/" target="_blank" rel="noreferrer">download it</a> and create an account. Be sure to keep your keys safe!</p>
                  </Card>
                </div>
            </Layout>
}
export default NoWallet;