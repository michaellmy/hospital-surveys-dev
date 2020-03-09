import React, { Component } from 'react'
import { Jumbotron, Container, Button, Image } from 'react-bootstrap';

import lockAndKey from '../logos/lockandkey.png'

export class LoggedOut extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid style={{backgroundColor: "#dae4f1"}}>
                    <Container>
                        <Image src={lockAndKey} rounded />
                        <h1 style={{color: '#000080'}}>Login to View and Manage Questionnaires</h1>
                        <p style={{color: '#00264d'}}>
                        You are seeing this page because you are either not logged in, or your session
                        has expired.
                        </p>
                        <p>
                            <Button style={{backgroundColor: '#0080ff'}} href="/login/" variant="primary">Sign In</Button>&nbsp;&nbsp;
                            <Button style={{backgroundColor: '#0080ff'}} href="/" variant="primary">Return to Home Page</Button>
                        </p>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}

export default LoggedOut
