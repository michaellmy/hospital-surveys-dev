import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SideBarMenu from './SideBarMenu';
import {connect } from 'react-redux'
import * as actions from '../../store/actions/auth';
import {Link, withRouter} from 'react-router-dom';

import goshlogo from '../logos/goshlogo.png';

class Header extends React.Component {
    render() {
        return (
            <div>
                <Navbar style={navStyle} variant="dark">
                    <img src={goshlogo} style={logoStyle} alt="logo" />
                    <Navbar.Brand href="https://www.goshdrive.com/">Drive</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href="/statistics">Statistics</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {
                        this.props.isAuthenticated ?

                        <Nav className="justify-content-end"> 
                            <Nav.Item>
                                <Nav.Link href="/" onClick={this.props.logout}>Logout</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        :

                        <Nav className="justify-content-end"> 
                            <Nav.Item>
                                <Nav.Link  href="/login/">Login</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    }
                </Navbar>
    
                <SideBarMenu />
            </div>
        )
    }
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

 
const mapDispatchToProps = dispatch => {
    return {
            logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));