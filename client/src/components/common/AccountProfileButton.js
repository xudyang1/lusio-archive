import { useContext, useEffect } from "react";
import React from 'react';
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";
import { useParams, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";


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
            <NavLink to={"/profile/" + user.profile} style={s}>
                <img className="circle" src={user.iconURI ? user.iconURI : "https://static.thenounproject.com/png/363633-200.png"} width='50px' height='50px' />
            </NavLink>
            {user.name}
        </div>
    )
}

