import React from 'react'
import "./navbar.component.css"

import Logo from "../assets/Hackathon-logo-removebg-preview.png"


const Navbar = () => {
    return (
        <div className="navbar-container">
            <img src={Logo} />
        </div>
    )
}

export default Navbar