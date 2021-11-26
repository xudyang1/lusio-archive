import React from 'react';
import { Route, Switch } from "react-router-dom";
import ProfileSidebar from './ProfileSidebar';

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";

import { useHistory, useParams, useRouteMatch } from 'react-router';
import { ProfileContext } from '../../context/ProfileState';
import SectionList from '../common/SectionList';
import ProfileHome from './ProfileHome';
import SettingsPage from './SettingsPage';
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from '../../types/cardTypes';
import { PlatformContext } from '../../context/PlatformState';
import { QuizzesContext } from '../../context/QuizState';

const s = {
    display: "flex",
    justifyContent: "center",
    width: "65%",
    height: "300px"
}

export default function ProfilePage() {
    const history = useHistory();
    const { id } = useParams();
    const { url, path } = useRouteMatch();

    const { getQuiz } = useContext(QuizzesContext)
    const { isAuthenticated, loadUser, user } = useContext(AuthContext)
    const { profile, getProfile, viewType } = useContext(ProfileContext)
    const { createPlatform, getPlatform } = useContext(PlatformContext)


    async function getQuizzes(items) {
        var templist = []

        return templist
    }

    async function getPlatformInformation(items) {
        var templist = []

        return templist
    }

    useEffect(() => {
        getProfile(id);
    }, [isAuthenticated, loadUser])

    async function createPlat(e) {
        const init = {
            platform: {
                name: "new platform",
                description: "description",
                bannerURI: "https://media.istockphoto.com/photos/green-background-3d-render-picture-id1226478926?b=1&k=20&m=1226478926&s=170667a&w=0&h=JnDdZVzHtMBfq5ZYQBevaTDCvbDRS2ZS5iGeaJKXBqA=",
                backgroundURI: "https://media.istockphoto.com/photos/green-background-3d-render-picture-id1226478926?b=1&k=20&m=1226478926&s=170667a&w=0&h=JnDdZVzHtMBfq5ZYQBevaTDCvbDRS2ZS5iGeaJKXBqA="
            }
        }
        const p = await createPlatform(init)
        history.push(`/platform/${p.platform._id}`)
    }

    return (
        <div>
            {(viewType === "OWNER_VIEW") ? <ProfileSidebar profileIconURI={profile.iconURI} leve={profile.level} path={url} /> : <div />}
            <div className="container z-depth-3">
                <Switch>
                    <Route exact path={url}><ProfileHome quizzes={getQuizzes(profile.quizzesCreated)} profile={profile} name={profile.name} /></Route>
                    <Route path={url + "/allquiz"}><SectionList items={getQuizzes(profile.quizzesCreated)} name={"All Quizzes"} type={QUIZ_CARD} callback={"createQuiz"} /></Route>
                    <Route path={url + "/allplatforms"}><SectionList items={getPlatformInformation(profile.platformsCreated)} name={"All Platforms"} type={SUB_PLAT_CARD} callback={"createPlat"} callbackFunc={createPlat} /></Route>
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