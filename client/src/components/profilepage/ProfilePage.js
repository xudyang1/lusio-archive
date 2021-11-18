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
import { PlatformContext } from '../../context/PlatformState';

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
    const { profile, getProfile, viewType } = useContext(ProfileContext)
    const { createPlatform } = useContext(PlatformContext)

    useEffect(() => {
        //getProfile(id);
        console.log("FROM PROFILEPAGE", profile)
    }, [isAuthenticated])

    function createPlat(e){
        console.log("Creating a new platform")
        const init = {
            name : "new platform",
            description : "description",
            bannerURI : "https://media.istockphoto.com/photos/green-background-3d-render-picture-id1226478926?b=1&k=20&m=1226478926&s=170667a&w=0&h=JnDdZVzHtMBfq5ZYQBevaTDCvbDRS2ZS5iGeaJKXBqA=",
            backgroundURI : "https://media.istockphoto.com/photos/green-background-3d-render-picture-id1226478926?b=1&k=20&m=1226478926&s=170667a&w=0&h=JnDdZVzHtMBfq5ZYQBevaTDCvbDRS2ZS5iGeaJKXBqA="
        }
        createPlatform(init)
    }

    return (
        <div>
            {(viewType === "OWNER_VIEW") ? <ProfileSidebar profileIconURI={profile.iconURI} leve={profile.level} path={url} /> : <div />}
            <div className="container z-depth-3">
                <Switch>
                    <Route exact path={url}><ProfileHome profile={profile} name={user.name} /></Route>
                    <Route path={url + "/allquiz"}><SectionList items={profile.quizzesCreated} name={"All Quizzes"} type={QUIZ_CARD} add={true} /></Route>
                    <Route path={url + "/allplatforms"}><SectionList items={profile.platformsCreated} name={"Participated Platforms"} type={SUB_PLAT_CARD} add={true} callback={createPlat}/></Route>
                    <Route path={url + "/achievements"}><SectionList items={profile.achievements} name={"Achievements"} type={ACHIEVEMENT_CARD} /></Route>
                    <Route path={url + "/subusers"}><SectionList items={profile.subscribedUsers} name={"Subscribed Users"} type={SUB_USER_CARD} /></Route>
                    <Route path={url + "/subplats"}><SectionList items={profile.subscribedPlatforms} name={"Subscribed Platforms"} type={SUB_PLAT_CARD} /></Route>
                    <Route path={url + "/liked"}><SectionList items={profile.likedQuizzes} name={"Liked Quizzes"} type={QUIZ_CARD} /></Route>
                    <Route path={url + "/history"}><SectionList items={profile.quizzesTaken} name={"Quiz History"} type={QUIZ_CARD} /></Route>
                    <Route path={url + "/accountsetting"}><SettingsPage /></Route>
                </Switch>
            </div>
        </div>
    )
}