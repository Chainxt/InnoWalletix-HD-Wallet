import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import '../css/Navbar.css';

const Navigation = ({ handleConnectWalletClick, showWalletScreen, handleBackButtonClick, selectedAccount, isPasscodeEntered, accountBalance}) => {
  const location = useLocation();

  const isNavItemActive = (path) => {
    return location.pathname === path;
  };
  return (
      <Navbar expand="lg" bg="secondary" variant="dark">
          <Container>
          {showWalletScreen ?
                <Button variant="outline-light" onClick={handleBackButtonClick}>Back</Button> :
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              }
              <Navbar.Collapse>
              {!showWalletScreen && (
                    <Nav className="me-auto">
                      <Nav.Link  as={Link} to="/" className={isNavItemActive("/") ? "active" : ""}>Home</Nav.Link>
                      <Nav.Link as={Link} to="/create" className={isNavItemActive("/create") ? "active" : ""}>Create</Nav.Link>
                      {selectedAccount && isPasscodeEntered && (<Nav.Link as={Link} to="/my-listed-items" className={isNavItemActive("/my-listed-items") ? "active" : ""}>My Listed Items</Nav.Link>)}
                      {selectedAccount && isPasscodeEntered && (<Nav.Link as={Link} to="/my-purchases" className={isNavItemActive("/my-purchases") ? "active" : ""}>My Purchases</Nav.Link>)}
                    </Nav>
                  )}
                  {!showWalletScreen && (!selectedAccount || !isPasscodeEntered) &&(
                    <div className="connectWalletBtnContainer">
                      <Button onClick={handleConnectWalletClick} variant="outline-light">Connect Wallet</Button>
                    </div>
                  )}
                  {!showWalletScreen && selectedAccount && isPasscodeEntered &&(
                    <div className="connectWalletBtnContainer">
                      <Button onClick={handleConnectWalletClick} variant="outline-light">Connected</Button>
                      <div className="nav-account-address">{selectedAccount.address}</div>
                      {accountBalance && (<div className="nav-account-address">{accountBalance} ETH</div>)}
                    </div>
                  )}
              </Navbar.Collapse>
          </Container>
      </Navbar>
  )

}

export default Navigation;