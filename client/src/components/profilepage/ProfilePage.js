import React, { Component } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileHeader from './ProfileHeader';

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthState";

import { useParams } from 'react-router';
import { ProfileContext } from '../../context/ProfileState';
import GeneralSections from '../common/GeneralSections';
import { ACHIEVEMENT_CARD, QUIZ_CARD } from '../../types/cardTypes';

import M from 'materialize-css';

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
            {(isAuthenticated && user.id == id)? <ProfileSidebar profileIconURI={userProfile.profileIcon} leve={userProfile.level}/> : <div/>}
            <div className="container z-depth-3">
                <ProfileHeader name={userProfile.name} description={userProfile.description} banner={userProfile.profileBanner}/>
                <GeneralSections items={userProfile.quizzes} type={QUIZ_CARD} name={"My Quizzes"}/>
                <GeneralSections items={userProfile.achievements} type={ACHIEVEMENT_CARD} name={"Achivements"}/>
            </div>
        </div>
    )
}