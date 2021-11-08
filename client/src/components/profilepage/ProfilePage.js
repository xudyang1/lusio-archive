import React, { Component } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileHeader from './ProfileHeader';

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";

import '../../css/frontpage.css';
import { useParams } from 'react-router';
import { ProfileContext } from '../../context/ProfileState';
import GeneralSections from '../common/GeneralSections';


const s = {
    display: "flex",
    justifyContent: "center",
    width: "65%",
    height: "300px"
}

export default function ProfilePage() {
    const {id} = useParams();

    const {isAuthenticated, loadUser, user } = useContext(AuthContext)
    const {userProfile, getProfiles} = useContext(ProfileContext)

    useEffect(() => {
        loadUser();
        getProfiles();
        //console.log(user.id, id)
    }, [])

    return (
        <div className='row'>
            {(isAuthenticated && user.id == id)? <ProfileSidebar profileIconURI={userProfile.profileIcon} leve={userProfile.level}/> : <div/>}
            <div className="container z-depth-3">
                <ProfileHeader name={userProfile.name} description={userProfile.description} banner={userProfile.profileBanner}/>
                <GeneralSections items={userProfile.quizzes} type={"quiz"} name={"My Quizzes"}/>
                <GeneralSections items={userProfile.achievements} type={"achievement"} name={"Achivements"}/>
            </div>
        </div>
    )
}