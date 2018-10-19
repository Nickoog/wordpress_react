import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Footer = () => (
    <footer id="colophon" className="footer">
        <div className="container footer-nav">
            <div className="social-container">
                <div className="icon-wrapper">
                    <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="icon-wrapper">
                    <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            <div className="footer-links-container">
                <NavLink className="nav-link" exact activeClassName="active" to={MarquisSettings.path + "politique-de-confidentialite/"}>Plan du site</NavLink>
                <NavLink className="nav-link" activeClassName="current" to={MarquisSettings.path + "politique-de-confidentialite/"}>Contact</NavLink>
            </div>
        </div>
        <div className="copyright-wrapper">
            <p>
                Copyright © {(new Date().getFullYear())} Marquis Theme
            </p>
        </div>
    </footer>
);

export default Footer;