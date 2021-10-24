import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css';

export const AppNavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo" style={{ paddingLeft: '1em' }}>Lusio</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="https://github.com/xudyang1/CSE416_Lusio">Github</a></li>
        </ul>
      </div>
    </nav>
  );
};
