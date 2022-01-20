
import { Menu, Layout } from "antd";
import { NavLink } from "react-router-dom";
import Account from "../Account";
import headerLogo from '../../assets/header-logo.png';
const { Header } = Layout;

const menuIcon = <svg className="menu-icon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>


export const Logo = () => (
    <div className="logo-container" style={{ display: "flex" }}>
      <img src={headerLogo} alt="Logo" />
    </div>
  );

export default function Roadmap(props) {
    const { isAuthenticated, isOwner } = props;

    const styles = {
        header: {
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Roboto, sans-serif",
          borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
          padding: "0 20px",
          boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
        },
        headerRight: {
          display: "flex",
          gap: "20px",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "600",
        },
      };

    const adminMenuLink = () => {
        if(isOwner){
            return <Menu.Item key="admin">
                    <NavLink to="/xc-labs-admin">Admin</NavLink>
                </Menu.Item>
        }
    }

    if(window.ethereum){
        return <>
                <Header style={styles.header}>
                <Logo />
                <Menu
                theme="light"
                mode="horizontal"
                overflowedIndicator={menuIcon}
                style={{
                    display: "flex",
                    fontSize: "17px",
                    fontWeight: "500",
                    width: "100%",
                    marginLeft: "100px",
                }}
                defaultSelectedKeys={["home"]}
                >

                <Menu.Item key="home">
                    <NavLink to="/">Home</NavLink>
                </Menu.Item>
                <Menu.Item  
                    key="mint" 
                    disabled={isAuthenticated ? false : true}
                >
                    <NavLink to="/mint">Mint</NavLink>
                </Menu.Item>
                <Menu.Item key="roadmap">
                    <NavLink to="/roadmap">Roadmap</NavLink>
                </Menu.Item>
                <Menu.Item key="gallery" disabled={isAuthenticated ? false : true}>
                    <NavLink to="/gallery">My Passes</NavLink>
                </Menu.Item>
                <Menu.Item key="how">
                    <NavLink to="/how-to">FAQ</NavLink>
                </Menu.Item>
                <Menu.Item key="snowflake">
                    <a href="https://snowflake.market/wallet" target="_blank" rel="noreferrer">Snowflake</a>
                </Menu.Item>
                { adminMenuLink() }
                </Menu>
                <div style={styles.headerRight}>
                <Account />
                </div>
                </Header>
            </>
    }else{
        return  <Header style={styles.header}>
                    <Logo />
                </Header>
    }
}