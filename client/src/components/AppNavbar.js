import React, { Component } from 'react';
import 'materialize-css';
import './frontpage.css'
// import M from 'materialize-css';

export const AppNavBar = () => {
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
            <div class="input-field">
                <input id="search" type="search" name="search" placeholder="SEARCH"/>
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
        </form>
      </div>
    </nav>
  );
};
