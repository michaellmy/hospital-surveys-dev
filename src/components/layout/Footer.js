import React from "react";
import "./footer.css"

function Footer() {
    return (
        <div style={footerStyle}>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6" style={aboutStyle}>
                            <h6>About</h6>
                            <p className="text-justify">Hospital Surveys is a UCL Project based on designing questionnaires and surveys for child patients of Great Ormond Street Hospital.</p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Categories</h6>
                            <ul className="footer-links">
                                <li><a href="/">Surveys</a></li>
                                <li><a href="/">Questionnaires</a></li>
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li><a href="/">About</a></li>
                                <li><a href="/">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const footerStyle = {
    marginTop: '2%'
}

const aboutStyle = {
    paddingRight: '8%'
}
export default Footer;