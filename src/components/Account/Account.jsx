import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "../Blockie";
import { Button, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Address from "../Address/Address";
import { connectors } from "./config";
import ReactGA from 'react-ga';

function Account(props) {
  const { isMintingPaused } = props;
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
      <div className="header-wallet not-logged"
        onClick={() => {
          setIsAuthModalVisible(true);
          ReactGA.modalview('/connect-wallet-modal');
          ReactGA.event({
            category: 'User',
            action: 'Connect Wallet Attempt'
          });
        }}
      >
        <p className="auth-button">Connect Wallet</p>
      </div>
      <Modal
          visible={isAuthModalVisible}
          footer={null}
          maskClosable={true}
          onCancel={() => setIsAuthModalVisible(false)}
          className="wallet-options-modal"
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "400",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Pick Wallet to Connect
          </div>
            <div className="wallet-options-container">
              {connectors.map(({ title, icon, connectorId }, key) => (
                <div
                  className="wallet-option"
                  key={key}
                  onClick={async () => {
                    try {
                      await authenticate({ provider: connectorId, chainId: 43114, signingMessage: "Welcome to XC Pass!"});
                      window.localStorage.setItem("connectorId", connectorId);
                      ReactGA.event({
                        category: 'User',
                        action: 'Connected Wallet'
                      });
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  <img src={icon} alt={title} />
                  <span className="wallet-name">{title}</span>
                </div>
              ))}
            </div>
        </Modal>
      </>
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
        className="sidebar-modal"
        bodyStyle={{
          backgroundColor: "#5900ff",
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
        <div className="sidebar-container">
          <div className="sidebar-inner-top">
            <Address
                avatar="left"
                size={6}
                style={{ fontSize: "16px", backgroundColor: "transparent", display: "flex", flexDirection: "column", height: "auto", paddingTop: "40px" }}
              />
              <div className="sidebar-inner-menu">
                <NavLink to="/user" className="sidebar-inner-menu-element">My Account</NavLink>
                {isMintingPaused || <NavLink to="/mint" className="sidebar-inner-menu-element">Mint your XC Pass</NavLink>}
                <NavLink to="/collections" className="sidebar-inner-menu-element">Collections</NavLink>
                <a
                  href={`https://snowtrace.io/address/${walletAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sidebar-inner-menu-element"
                >
                  Activity
                </a>
              </div>
          </div>
          <Button
            size="large"
            type="primary"
            style={{
              width: "100%",
              marginTop: "10px",
              backgroundColor: "transparent",
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
        </div>
      </Modal>
    </>
  );
}

export default Account;