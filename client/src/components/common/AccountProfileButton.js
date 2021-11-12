import { Component, useContext, useEffect, useState } from "react";
import React from 'react';
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";


export default function AccountProfileButton() {

    const { user } = useContext(AuthContext);
    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        //console.log(user.profile)
        getProfile(user.profile);
        // console.log(userProfile);
    }, []);

    const s = {
        height: "50px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: "5px"
    }

    return (
        <div className="valign-wrapper">
            <a href={"/profile/" + user.profile} style={s}>
                <img className="circle" src={profile.iconURI ? profile.iconURI : "https://static.thenounproject.com/png/363633-200.png"} width='50px' height='50px' />
            </a>
            {user.name}
        </div>
    )
}

