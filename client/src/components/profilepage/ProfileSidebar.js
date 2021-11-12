import React, { Component, useContext, useEffect, useReducer } from 'react';
import M from 'materialize-css';
import '../../css/profilepage.css'
import ProfilePage from './ProfilePage';
import { AuthContext } from '../../context/AuthState';


export default function ProfileSidebar(props) {
    // constructor(props){
    //     super(props);

    // }
    const { loadUser, isAuthenticated, user } = useContext(AuthContext)

    useEffect(() => {
        loadUser();
    }, []);
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    return (
        <div>
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        {/* <img src="images/office.jpg"/> */}
                    </div>
                    <a href="#user"><img className="circle" src={props.profileIconURI? props.profileIconURI : "https://static.thenounproject.com/png/363633-200.png"} width='65%' height='300px' /></a>
                    <a href="#name"><span className="name">{user.name}</span></a>
                    <a href="#email"><span className="email">{user.email}</span></a>
                </div></li>
                <li><a href={props.path}><i className="material-icons">home</i>Home</a></li>
                <li><a href={props.path+"/allquiz"}><i className="material-icons">description</i>My Quizzes</a></li>
                <li><a href={props.path+"/achievements"}><i className="material-icons">emoji_events</i>My Achievements</a></li>
                <li><a href={props.path+"/subusers"}><i className="material-icons">contact_page</i>Subscribed User</a></li>
                <li><a href={props.path+"/subplats"}><i className="material-icons">subscriptions</i>Subscribed Platforms</a></li>
                {/* //<li><a href="/"><i className="material-icons">settings</i>Account Setting</a></li> */}
                <li><a href={props.path+"/accountsetting"}><i className="material-icons">settings</i>Account Setting</a></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons" style={{position:'fixed', fontSize: '3em'}}>menu</i></a>
        </div>
    );
    //}
}

