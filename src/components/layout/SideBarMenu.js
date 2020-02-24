import React from 'react'
import './sideBarMenu.css'

function SideBarMenu() {
    return (
        <div className="menu-wrap">
            <input type="checkbox" className="toggler" />
            <div className="hamburger"><div></div></div>
            <div className="menu">
                <div>
                    <div>
                        <ul>
                            <hr style={hrStyle}></hr>
                            <li><a href="/">Home</a></li>
                            <hr style={hrStyle}></hr>
                            <li><a href="/manage">Manage</a></li>
                            <hr style={hrStyle}></hr>
                            <li><a href="/">Answer</a></li>
                            <hr style={hrStyle}></hr>
                            <li><a href="/statistics">Statistics</a></li>
                            <hr style={hrStyle}></hr>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const hrStyle = {
    backgroundColor: 'white'
}

export default SideBarMenu