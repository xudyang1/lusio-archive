import React, { Component } from 'react';
import 'materialize-css';
import '../frontpage.css'
// import M from 'materialize-css';
import SearchBar from '../SearchBar';


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
        <SearchBar />
      </div>
    </nav>
  );
};
