import React from "react";

import "./css/Navbar.css"

const Navbar = ({showButtons}) => (
        <header>
            <nav className="navbar">
                <div className="left">
                    <a href="#">Admin UI</a> 
                    <button className="buttons" style={{ display: (showButtons && localStorage.getItem('token') ) 
                                                                            ? "inline-block" : "none" }}>Add new</button>
                </div>
                <div className="right" style={{ display: (showButtons && localStorage.getItem('token') ) 
                                                                            ? "flex" : "none" }}>
                    <button className="square"><img src="#"/></button>
                    <button>User Login</button>
                    <button>Logout</button>
                </div>                
            </nav>
        </header>
);

export default Navbar;