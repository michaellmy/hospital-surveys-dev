import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import refreshicon from '../logos/refreshicon.png'

export class ListTitle extends Component {
    render() {
        return (
            <header style={headerStyle}>
                <h6 style={{color: 'white'}}><b>Manage Questionnaires</b><Image src={refreshicon} onClick={this.props.refresh} style={imgStyle} /></h6>
            </header>
        )
    }
}

const headerStyle = {
    background: '#252574',
    color: 'white',
    textAlign: 'left',
    padding: '14px 10px 5px 20px',
    marginTop: '2%'
}

const imgStyle = {
    float: 'right',
    height: '25px',
    padding:'0 0 3px 0',
    cursor: 'pointer'
}

export default ListTitle;