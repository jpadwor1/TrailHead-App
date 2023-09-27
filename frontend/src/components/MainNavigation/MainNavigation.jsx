import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './MainNavigation.css'
import Logo from '../../assets/images/default-monochrome-black.svg'
import Button from 'react-bootstrap/Button';

function MainNavigation() {
  return (
    <Navbar fixed='top' expand="xl" className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand href="/">
            <img className='logo' src={Logo} alt="Logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end"  id="basic-navbar-nav">
          <Nav className="navbar-offcanvas">
            <Nav.Link className='nav-link ' href="/">HOME</Nav.Link>
            <Nav.Link className='nav-link ' href="/alltrails">ALL TRAILS</Nav.Link>
            <NavDropdown title="COMMUNITY" id="basic-nav-dropdown">
            <NavDropdown.Divider />
              <NavDropdown.Item href="/api/add-trail">
                ADD A TRAIL
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">REGISTER</NavDropdown.Item>
              
            </NavDropdown>
            <div className="navbar-btn-container justify-content-end">
                <Button className='login-btn' href='/signin'>Login</Button>
                <Button className='register-btn'href='/register'>Register</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  )
}

export default MainNavigation