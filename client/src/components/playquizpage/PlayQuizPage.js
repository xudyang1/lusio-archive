import React, { useContext } from 'react';
import "materialize-css/dist/css/materialize.min.css";
import PlayQuizContent from './PlayQuizContent';
import { ProfileContext } from '../../context/ProfileState';

export default function PlayQuizPage() {
    const {updateProfile, profile} = useContext(ProfileContext);
    return (
        <div>
            <PlayQuizContent updateProfile={updateProfile} userId={profile._id}/>
        </div>
    )
}