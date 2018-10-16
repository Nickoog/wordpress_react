import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends React.Component {

    constructor() {
        super();
        this.burgerToggle = this.burgerToggle.bind(this);
    }

    burgerToggle = () => {
        let linksEl = document.querySelector('.mobilLinks');
        let burgerEl = document.querySelector('#nav-icon');
		if (linksEl.style.transform === 'translateY(0px)') {
            linksEl.style.transform = 'translateY(-160px)';
            linksEl.style.opacity = '0';
            burgerEl.classList.remove("open");
		} else {
            linksEl.style.transform = 'translateY(0px)';
            linksEl.style.opacity = '1';
            burgerEl.classList.add("open");

		}
    }

    render() {
        return (
            <header id="masthead" className="header" role="banner">
                <nav>
                    <div className="logo-wrapper">
                        <h1 className="site-title"><Link to={MarquisSettings.path}>Marquis</Link></h1>
                    </div>
                    <div className="link-container">
                        <NavLink className="nav-link" exact activeClassName="active" to={MarquisSettings.path}>Home</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to={MarquisSettings.path + "gallery/"} >Galeries</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to={MarquisSettings.path + "posts/"} >Blogue <span className="sr-only">(current)</span></NavLink>
                        <NavLink className="nav-link" activeClassName="current" to={MarquisSettings.path + "politique-de-confidentialite/"} >Contact</NavLink>
                    </div>
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
                    <div className="navMobil">
                        <div id="nav-icon" className="" onClick={this.burgerToggle}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </nav>
                <div className="mobilLinks">
                    <Link className="nav-link" onClick={this.burgerToggle} to={MarquisSettings.path} >Home <span className="sr-only">(current)</span></Link>
                    <Link className="nav-link" onClick={this.burgerToggle} to={MarquisSettings.path + "gallery/"} >Galeries</Link>
                    <Link className="nav-link" onClick={this.burgerToggle} to={MarquisSettings.path + "posts/"} >Blogue</Link>
                    <Link className="nav-link" onClick={this.burgerToggle} to={MarquisSettings.path + "politique-de-confidentialite/"} >Contact</Link>
                </div>
            </header>         
        );
    }
}

export default Header;