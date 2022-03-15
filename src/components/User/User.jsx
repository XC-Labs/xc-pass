import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { Row, Col, Button, Card, Form, notification, Input } from 'antd';
import { withRouter } from "react-router-dom";
import nft from '../../assets/nft.png';

const User = (props) => {
    const { isAuthenticated, contractAddress, abi, registerPageView } = props;
    const { Moralis } = useMoralis();
    const { walletAddress } = useMoralisDapp();
    const [responses, setResponses] = useState({});
    const [checkedUserDetails, setCheckedUserDetails] = useState(false);
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [tokensInWallet, setTokensInWallet] = useState([]);

    useEffect(() => {
        document.title = "My Account | XC Labs";
        registerPageView("/user" + window.location.search);
    }, [registerPageView]);

    const openNotification = ({ message, description }) => {
        notification.open({
            placement: "bottomRight",
            message,
            description,
            onClick: () => {
            console.log("Notification Clicked!");
            },
        });
    };

    const checkUserDetails = async () => {
        const User = Moralis.Object.extend("User");
        const query = new Moralis.Query(User);
        query.equalTo("ethAddress", walletAddress.toLowerCase());
        const object = await query.first();
        if(object){
            setUserName(object.get("name"));
            setUserEmail(object.get("email"));
        }
    }

    const setUserDetails = async () => {
        const User = Moralis.Object.extend("User");
        const query = new Moralis.Query(User);
        query.equalTo("ethAddress", walletAddress.toLowerCase());
        const object = await query.first();
        if(object){
            if(userEmail){
                object.set("name", userName);
                object.set("email", userEmail);
                object.save();
            }
            object.fetch().then((newObj) => {
                setUserName(newObj.get("name"));
                setUserEmail(newObj.get("email"));
            }, (error) => console.log(error));
        }
        openNotification({
            message: "User Details Updated",
            description: "Your personal details have been saved.",
            });
        setResponses({ ...responses, "userDetails": { result: "", isLoading: false } });
    }

    useEffect(()=>{
        if(isAuthenticated){
            checkUserDetails();
            setCheckedUserDetails(true);
            const options = {
                contractAddress,
                functionName: 'walletOfOwner',
                abi,
                params: {
                    "_owner": walletAddress
                }
            };
            Moralis.executeFunction(options).then(response =>{
                setTokensInWallet(response);
            })
        }
        // eslint-disable-next-line
    },[walletAddress]);

    const transferToken = (pass) => {
        console.log(pass);
    }

    const burnToken = (pass) => {
        console.log(pass);
    }

    const renderUserDetails = () => {
        if(checkedUserDetails){
            return <Form.Provider
                onFormFinish={async () => {
                    setUserDetails();
                }}
            >
                <Form layout="vertical" name="userDetails">
                    <h4 className="user-name">Name</h4>
                    <Input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} placeholder="Name"/>
                    <h4 className="user-email">Email</h4>
                    <Input type="email" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}} placeholder="Email"/>
                    <br/><br/>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={responses["userDetails"]?.isLoading}
                        >
                        Save
                    </Button>
                </Form>
            </Form.Provider>
        }
    }

    const renderTokens = () => {
        if(tokensInWallet?.length > 0){
            return tokensInWallet?.map(pass => {
                return <Row key={pass} className="user-pass-row">
                    <Col>XC Pass #{pass}</Col>
                    <Col className="user-pass-actions">
                        <Button onClick={()=>{transferToken(pass)}} disabled>Transfer</Button>
                        <Button onClick={()=>{burnToken(pass)}} disabled>Burn</Button></Col>
                </Row>
            })
        }else{
            return <Row className="user-pass-row"><h4>You have no passes yet.</h4></Row>
        }
    }

    return <div className="userDetails-container">
        <h2>My Account</h2>
            <Row>
                <Col span={7} className="user-box">
                    <Card title={<h3>User Details</h3>}>
                        {renderUserDetails()}
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title={<h3>XC Passes</h3>}>
                    <div className="user-passes-box">
                        <img className="user-passes" src={nft} alt="XC Pass"/>
                        <div className="user-actions-box">
                            {renderTokens()}
                        </div>
                    </div>
                    </Card>
                </Col>
            </Row>
    </div>
}

export default withRouter(User);