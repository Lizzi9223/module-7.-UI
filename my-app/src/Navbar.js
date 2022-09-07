import React from "react";

import "./css/Navbar.css"

class Navbar extends React.Component {
    constructor (props) {
      super(props); 
    };

    logout = () => {
        localStorage.clear();
        this.props.navigate('/login');
    }

    render(){
        return(
            <header>
                <nav className="navbar">
                    <div className="left">
                        <a href="#">Admin UI</a> 
                        <button className="buttons" 
                            onClick={() => this.props.mainPageRef.current(false, true, 0)}
                            style={{ display: (this.props.showButtons && localStorage.getItem('token') ) ? "inline-block" : "none" }}>
                            Add new
                        </button>
                    </div>
                    <div className="right" style={{ display: (this.props.showButtons && localStorage.getItem('token') ) 
                                                                                ? "flex" : "none" }}>
                        <button className="square"><img src="#"/></button>
                        <button>{localStorage.getItem('login')}</button>
                        <button onClick={this.logout}>Logout</button>
                    </div>                
                </nav>
            </header>
        )
    }
}

export default Navbar;