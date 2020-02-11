import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import refreshicon from '../logos/refreshicon.png'

export class ListTitle extends Component {
    render() {
        return (
            <header style={headerStyle}>
                <h6><b>Your Questionnaires</b><Image src={refreshicon} onClick={this.props.refresh} style={imgStyle} /></h6>
            </header>
        )
    }
}

const headerStyle = {
    background: '#252574',
    color: '#fff',
    textAlign: 'left',
    paddingLeft: '20px',
    paddingTop: '14px',
    paddingBottom: '5px',
    marginTop: '2%'
}

const imgStyle = {
    float: 'right',
    height: '25px',
    paddingRight: '1%',
    paddingBottom: '3px',
    cursor: 'pointer'
}

export default ListTitle;