import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "./Blockie";
import { Button, Modal, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Address from "./Address/Address";
import { SelectOutlined } from "@ant-design/icons";

function Account() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="header-wallet not-logged"
        onClick={() => authenticate({ signingMessage: "Welcome to XC Pass!" })}
      >
        <p className="auth-button">Connect Wallet</p>
      </div>
    );
  }

  return (
    <>
      <div className="header-wallet" onClick={() => setIsModalVisible(true)}>
        <p className="header-address">
          {getEllipsisTxt(walletAddress, 6)}
        </p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          backgroundColor: "#535353",
          color: "white",
          position: "fixed",
          right: "0px",
          top: "0px",
          width: "320px",
          height: "100vh",
          padding: "30px 15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
          <Address
            avatar="left"
            size={6}
            style={{ fontSize: "16px", backgroundColor: "transparent", display: "flex", flexDirection: "column", height: "auto", paddingTop: "40px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            
          </div>

        <Menu
        mode="vertical"
        style={{
            display: "flex",
            fontSize: "17px",
            fontWeight: "500",
            width: "100%",
            marginLeft: "80px",
        }}
        defaultSelectedKeys={[""]}
        >
            <a
              href={`https://testnet.snowtrace.io/address/${walletAddress}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "white" }}
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
            <Menu.Item key="gallery" disabled={isAuthenticated ? false : true}>
                <NavLink to="/gallery">My Passes</NavLink>
            </Menu.Item>

        </Menu>

        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            border: "1px solid white",
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            logout();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
