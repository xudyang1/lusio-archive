import { Component, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";
import { useParams, useRouteMatch } from "react-router";


export default function AccountProfileButton() {

    const { user, isAuthenticated } = useContext(AuthContext);
    const { profile, getProfile } = useContext(ProfileContext)

    const { id } = useParams()
    const { url, path } = useRouteMatch()

    useEffect(() => {
        getProfile(user.profile);
        // console.log("FROM ACCOUNT BUTTON", profile);
    }, [isAuthenticated]);

    const s = {
        height: "50px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: "5px"
    }

    return (
        <div className="valign-wrapper">
            <Link to={"/profile/" + user.profile} style={s}>
                <img className="circle" src={profile.iconURI ? profile.iconURI : "https://static.thenounproject.com/png/363633-200.png"} width='50px' height='50px' />
            </Link>
            {user.name}
        </div>
    )
}

