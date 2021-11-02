import React, { Component } from 'react';
import M from 'materialize-css';

export default function ProfileSidebar(){
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    
    return(
        <div>
            <ul id="slide-out" className="sidenav">
            <li><div className="user-view">
                <div className="background">
                {/* <img src="images/office.jpg"/> */}
                </div>
                {/* profile icons to be used in profile page. have to get the sidebar fixed without the slide-on but with the same format as it is now*/}
                <a href="#user"><img className="circle" src="https://www.seekpng.com/png/detail/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png"/></a>
                <a href="#name"><span className="name">John Doe</span></a>
                <a href="#email"><span className="email">jdandturk@gmail.com</span></a>
            </div></li>
            <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
            <li><a href="#!">Second Link</a></li>
            <li><div className="divider"></div></li>
            <li><a className="subheader">Subheader</a></li>
            <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    )
}