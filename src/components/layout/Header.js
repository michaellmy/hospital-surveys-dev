import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SideBarMenu from './SideBarMenu';

import goshlogo from '../logos/goshlogo.png';

function Header() {
    return (
        <div>
            <Navbar style={navStyle} variant="dark">
                <img src={goshlogo} style={logoStyle} alt="logo" />
                <Navbar.Brand href="https://www.goshdrive.com/">Drive</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">About</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <NavDropdown title="john_wick99" style={accountStyle} drop='left'>
                        <NavDropdown.Item href="#action/3.1">Your Questionnaires</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Account Details</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>

            <SideBarMenu />
        </div>
    )
}

const accountStyle = {
    float: 'right'
}

const logoStyle = {
    width: '50px',
    height: '40px',
    display: 'inline-block',
    marginRight: '10px'
}

const navStyle = {
    backgroundColor: '#252574',
    paddingLeft: '70px'
}

export default Header;