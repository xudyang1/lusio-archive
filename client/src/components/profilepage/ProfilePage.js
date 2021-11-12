import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import ProfileSidebar from './ProfileSidebar';
import ProfileHeader from './ProfileHeader';

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";

import { useParams, useRouteMatch } from 'react-router';
import { ProfileContext } from '../../context/ProfileState';
import GeneralSections from '../common/GeneralSections';


import M from 'materialize-css';
import SectionList from '../common/SectionList';
import ProfileHome from './ProfileHome';
import SettingsPage from './SettingsPage';
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from '../../types/cardTypes';

const s = {
    display: "flex",
    justifyContent: "center",
    width: "65%",
    height: "300px"
}

export default function ProfilePage() {
    const { id } = useParams();
    const { url, path } = useRouteMatch();

    const { isAuthenticated, loadUser, user } = useContext(AuthContext)
    const { profile, getProfiles } = useContext(ProfileContext)

    useEffect(() => {
        loadUser();
        getProfiles();
        //console.log(user.id, id)
    }, [])

    // useEffect(()=>{
    //     const options = {
    //         numVisible: 8,
    //         dist: -50,
    //         padding: 100,
    //         indicators: true,
    //         shift: 100,
    //     }
    //     var elems = document.querySelectorAll('.carousel');
    //     var instances = M.Carousel.init(elems, options);
    // })


    return (
        <div>
            {(isAuthenticated && user.id == id) ? <ProfileSidebar profileIconURI={profile.profileIcon} leve={profile.level} path={url} /> : <div />}
            <div className="container z-depth-3">
                {/* <ProfileHome profile={profile} /> */}
                {/* <ProfileHome profile={profile}/> */}
                <Switch>
                    <Route exact path={url}><ProfileHome profile={profile} /></Route>
                    <Route path={url + "/allquiz"}><SectionList name={"All Quizzes"} type={QUIZ_CARD}/></Route>
                    <Route path={url + "/achievements"}><SectionList name={"Achievements"} type={ACHIEVEMENT_CARD}/></Route>
                    <Route path={url + "/subusers"}><SectionList name={"Subscribed Users"} type={SUB_USER_CARD}/></Route>
                    <Route path={url + "/subplats"}><SectionList name={"Subscribed Platforms"} type={SUB_PLAT_CARD}/></Route>
                    <Route path={url + "/accountsetting"}><SettingsPage /></Route>
                </Switch>
            </div>
        </div>
    )
}