import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    // using href will cause the page to refresh, use link so that it looks more smooth
    return (
        <nav>
            <div className="nav-wrapper" style={{ color: "black" }}>
                <Link to="/" className="brand-logo left">Udemy MERN</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;