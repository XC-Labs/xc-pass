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
    const { isAuthenticated, isOwner, isWhitelistActive } = props;

    const adminMenuLink = () => {
        if(isOwner){
            return <Menu.Item key="admin">
                    <NavLink to="/xc-labs-admin">Admin</NavLink>
                </Menu.Item>
        }
    }

    if(window.ethereum){
        return <>
                <Header className="main-header">
                    
                    <NavLink to="/"><Logo /></NavLink>
                
                    <Menu
                    theme="light"
                    mode="horizontal"
                    overflowedIndicator={menuIcon}
                    style={{
                        display: "flex",
                        fontSize: "17px",
                        fontWeight: "500",
                        width: "100%",
                        marginLeft: "80px",
                    }}
                    defaultSelectedKeys={[""]}
                    >
                        <Menu.Item key="roadmap">
                            <NavLink to="/roadmap">Roadmap</NavLink>
                        </Menu.Item>
                        <Menu.Item  
                            key="mint" 
                            disabled={isAuthenticated && !isWhitelistActive ? false : true}
                        >
                            <NavLink to="/mint">Mint your XC Pass</NavLink>
                        </Menu.Item>
                        <Menu.Item key="what-we-do">
                            <NavLink to="/what-we-do">What We Do</NavLink>
                        </Menu.Item>
                        <Menu.Item key="meet-the-team">
                            <NavLink to="/meet-the-team">Meet the Team</NavLink>
                        </Menu.Item>
                        <Menu.Item key="gallery" disabled={isAuthenticated ? false : true}>
                            <NavLink to="/gallery">My Passes</NavLink>
                        </Menu.Item>
                        <Menu.Item key="faq">
                            <NavLink to="/faq">FAQs</NavLink>
                        </Menu.Item>
                        { adminMenuLink() }
                    </Menu>

                    <div className="main-header-right">
                        <Account />
                    </div>

                </Header>
            </>
    }else{
        return  <Header className="main-header">
                    <Logo />
                </Header>
    }
}