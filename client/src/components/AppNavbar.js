import React, { Component } from 'react';
import 'materialize-css';
import './frontpage.css'
// import M from 'materialize-css';

export const AppNavbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo" style={{ paddingLeft: '1em' }}>Lusio</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="https://github.com/xudyang1/CSE416_Lusio">Github</a></li>
          <li><a>Login</a></li>
          <li><a>Register</a></li>
        </ul>
        <form>
            <div className="input-field">
                <input id="search" type="search" name="search" placeholder="SEARCH"/>
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
            </div>
        </form>
      </div>
    </nav>
  );
};
