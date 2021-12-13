import React, { useContext, useEffect } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import PlayQuizContent from './PlayQuizContent';
import { ProfileContext } from '../../context/ProfileState';
import { AuthContext } from '../../context/AuthState';

export default function PlayQuizPage() {
    const {getProfile, updateProfile} = useContext(ProfileContext);
    const {user } = useContext(AuthContext);
    useEffect(()=>{
        console.log(user.status)
        if(user.status){
            window.location = '/suspended';
        }
    })

    return (
        <div>
            <PlayQuizContent updateProfile={updateProfile} getProfile={getProfile} userId={user.profile}/>
        </div>
    )
}