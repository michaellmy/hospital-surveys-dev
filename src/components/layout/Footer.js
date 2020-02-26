import React from "react";
import "./footer.css"

function Footer() {
    return (
        <div style={footerStyle}>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>Legal</h6>
                            <p className="text-justify">Copyright ©2019 - 2020 <b>GOSH DRIVE</b> | All Rights Reserved.</p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Categories</h6>
                            <ul className="footer-links">
                                <li><a href="/">Surveys</a></li>
                               
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li><a href="/">About</a></li>
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const footerStyle = {
    fontFamily: ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    position: 'relative',
    marginTop: '2%',
    zIndex: '-1'
}

export default Footer;