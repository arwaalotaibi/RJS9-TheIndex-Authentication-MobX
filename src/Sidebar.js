import React, { Component } from "react";
import { NavLink  } from "react-router-dom";

// Logo
import logo from "./assets/theindex.svg";
import authStore from "./stores/authStore";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
          </section>

          {!authStore.user ? (
          <h4 className="menu-item">
            <NavLink to="/signup">signup</NavLink>
            <NavLink to="/login">login</NavLink>
          </h4> 
          ):(
          <botton 
              className ="btn btn-danger" 
              onClick={ () => authStore.logout() } 
            >
              Logout {authStore.user.username}
            </botton>
          )}
          
      </div>
    );
  }
}

export default Sidebar;
