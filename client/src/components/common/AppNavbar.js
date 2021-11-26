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
import AccountProfileButton from './AccountProfileButton';
import { ProfileContext } from '../../context/ProfileState';

const AppNavbar = () => {

    const { loadUser, isAuthenticated, user } = useContext(AuthContext);
    //load user
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="">
            <nav>
                <div className="nav-wrapper">

                    <a href="/" className="brand-logo" style={{ paddingLeft: '1em' }}>Lusio</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {isAuthenticated ? (<span><li><AccountProfileButton /></li><li><Logout /></li></span>) :
                            (<span><li><LoginModal /></li><li><RegisterModal /></li></span>)}
                        <li><a href="https://github.com/xudyang1/CSE416_Lusio" style={{ fontSize: "1.5em" }}>Github</a></li>
                    </ul>
                    <SearchBar />
                </div>
            </nav>
        </div>
    );
};


export default AppNavbar;