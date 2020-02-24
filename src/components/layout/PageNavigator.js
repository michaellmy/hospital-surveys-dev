import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';

export class NavUp extends Component {
    render() {
        return (
            <div>
                <a href="#!" onClick={scroll.scrollToTop} style={topStyle}>
                    <p style={textStyle}><b>^</b></p>
                </a> 

                <a href="#!" onClick={scroll.scrollToBottom} style={bottomStyle}>
                    <p style={textStyle}><b>v</b></p>
                </a> 
            </div>
        )
    }
}

const topStyle={
    position: "fixed",
	width:'50px',
	height:'50px',
	bottom:'100px',
	right:'15px',
	backgroundColor:'#0C9',
	color:'#FFF',
	borderRadius:'50px',
    textAlign:'center',
    textDecoration: 'none',
	boxShadow: '2px 2px 3px #999'
}


const bottomStyle={
    position: "fixed",
	width:'50px',
	height:'50px',
	bottom:'40px',
	right:'15px',
	backgroundColor:'#0C9',
	color:'#FFF',
	borderRadius:'50px',
    textAlign:'center',
    textDecoration: 'none',
	boxShadow: '2px 2px 3px #999'
}

const textStyle = {
    paddingTop: '15px'
}

export default NavUp
