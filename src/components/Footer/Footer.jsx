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
                    <a href="https://maw.dev" title="Medium" target="_noblank" rel="noreferrer">Medium</a>
                    <a href="https://maw.dev" title="Discord" target="_noblank" rel="noreferrer">Discord</a>
                    <a href="https://maw.dev" title="Twitter" target="_noblank" rel="noreferrer">Twitter</a>
                </div>
            </div>
}

export default Footer;