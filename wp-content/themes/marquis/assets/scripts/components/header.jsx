import React from 'react';
import { NavLink, Link } from 'react-router-dom';


const delta = 5;
const navbarHeight = 113;

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            didScroll: true,
            lastScrollTop: 0,
            navClass: 'nav-down',
            burgerClass: 'close',
            opacity: '0',
            transform: 'translateY(-160px)'
        }
        this.burgerToggle = this.burgerToggle.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    hideHeader = () => {
        this.setState({
            navClass: 'nav-up',
            burgerClass: 'close',
            opacity: '0',
            transform: 'translateY(-160px)'
        })
    }
    
    showHeader = () => {
        this.setState({
            navClass: 'nav-down'
        })
    }
    
    getDocHeight = () => {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }
    
    hasScrolled = () => {
        const st = window.scrollY;
    
        // Make sure they scroll more than delta
        if(Math.abs(this.state.lastScrollTop - st) <= delta)
            return;
    
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > this.state.lastScrollTop && st > navbarHeight){
            // Scroll Down
            this.hideHeader();
        } else {
            // Scroll Up
            // if(st + window.outerHeight < this.getDocHeight()) {
            //   this.showHeader();
            // }
            if(st < this.getDocHeight()) {
              this.showHeader();
            }
        }
    
        this.setState({
            lastScrollTop: st
        })
    
    }
    
    handleScroll = (event) => {
        this.setState({
            didScroll: true
        })
        _.debounce(this.hasScrolled(), 250);
    
    }

    burgerToggle = () => {
        this.state.burgerClass === 'close' ? 
        this.setState({
            burgerClass: 'open', 
            opacity: '1', 
            transform: 'translateY(0px)'
        }) : 
        this.setState({
            burgerClass: 'close',
            opacity: '0', 
            transform: 'translateY(-160px)'
        })

    }

    render() {
        return (
            <header id="header" role="banner" className={this.state.navClass}>
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
                        <div 
                            id="nav-icon"
                            onClick={this.burgerToggle}
                            className={this.state.burgerClass} >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </nav>
                <div 
                    className="mobilLinks"
                    style={{'transform' :`${this.state.transform}`, 'opacity' :`${this.state.opacity}`}}>
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