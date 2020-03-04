import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {connect } from 'react-redux'
import * as actions from '../../store/actions/auth';
import {withRouter} from 'react-router-dom';

import goshlogo from '../logos/goshlogo.png';

class Header extends React.Component {
    render() {
        return (
            <div style={{marginTop: '57px'}}>
                <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" style={navStyle}>
                    
                    <Navbar.Brand href="/">
                        <img src={goshlogo} style={logoStyle} alt="logo"/>{' '}Hospital Surveys
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">                     
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Nav.Link href="/manage">Manage</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href="/answerSearch">Answer</Nav.Link>
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
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const logoStyle = {
    height: '30px',
    display: 'inline-block',
    marginRight: '5px'
}

const navStyle = {
    backgroundColor: '#252574',
    paddingLeft: '20px'
}

 
const mapDispatchToProps = dispatch => {
    return {
            logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));