import React, { Component, useContext, useEffect } from 'react';
import Modal from "react-responsive-modal";
import 'materialize-css';
import '../../css/frontpage.css';
// import M from 'materialize-css';
import SearchBar from '../SearchBar';
import { LoginModal } from '../auth/LoginModal';
import { AuthContext } from '../../context/AuthState';
import { RegisterModal } from '../auth/RegisterModal';
import { Logout } from '../auth/Logout';

const AppNavbar = () => {

  const { loadUser, isAuthenticated, user } = useContext(AuthContext);
  //load user
  useEffect(() => { loadUser(); }, []);
  //display correct layout based on credential condition
  // useEffect(() => {
  //   if(isAuthenticated)

  //  }, [isAuthenticated]);

  return (
    <nav>
      <div className="nav-wrapper">

        <a href="/" className="brand-logo" style={{ paddingLeft: '1em' }}>Lusio</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isAuthenticated ? <li><Logout /></li> : (<span><li><LoginModal /></li>
            <li><RegisterModal /></li></span>)}
          <li><a href="https://github.com/xudyang1/CSE416_Lusio" style={{ fontSize: "1.5em" }}>Github</a></li>
        </ul>
        <SearchBar />
      </div>
    </nav>
  );
};


export default AppNavbar;