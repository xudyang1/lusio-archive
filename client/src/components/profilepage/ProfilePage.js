import React, { Component } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileHeader from './ProfileHeader';
import MyQuizzesSection from './MyQuizzesSection';
import AchievementsSection from './AchievementsSection';

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";

import '../../css/frontpage.css';
import { useParams } from 'react-router';

//import { addProfile } from '../../actions/ProfileActions';
//import sampleUserProfile from '../../sampleData/sampleUser.json'

const s = {
    display: "flex",
    justifyContent: "center",
    width: "65%",
    height: "300px"
}

export default function ProfilePage() {
    const {id} = useParams();

    const {isAuthenticated, loadUser, user } = useContext(AuthContext)
    useEffect(() => {
        loadUser();
        console.log(user.id, id)
    }, [])

    return (
        <div className='row'>
            {(isAuthenticated && user.id == id)? <ProfileSidebar profileIconURI="{this.state.profileIconURI}" /> : <div/>}
            <div className="container z-depth-3">
                <ProfileHeader user={user} />
                <MyQuizzesSection/>
                <AchievementsSection/>
            </div>
        </div>
    )
}