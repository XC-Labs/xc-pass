import headerLogo from '../../assets/header-logo.png';

export const Logo = () => (
    <div className="logo-container" style={{ display: "flex" }}>
      <img src={headerLogo} alt="Logo" />
    </div>
  );

const Footer = () => {
    return <div className="main-footer">
                <Logo />
                <div className='footer-links'>
                    <a href="https://medium.com/xc-labs/" title="Medium" target="_noblank" rel="noreferrer">Medium</a>
                    <a href="https://discord.com/invite/mTYgkkeA28" title="Discord" target="_noblank" rel="noreferrer">Discord</a>
                    <a href="https://twitter.com/xc_agent" title="Twitter" target="_noblank" rel="noreferrer">Twitter</a>
                </div>
            </div>
}

export default Footer;