import { Component, useContext, useState } from "react";
import React from 'react';
import { AuthContext } from "../../context/AuthState";


export default function AccountProfileButton(){

    const {user} = useContext(AuthContext);

    const s = {
        height: "50px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: "5px"
    }

    return(
        <div className="valign-wrapper">
            <a href="#" style={s}>
                <img className="circle" src="https://www.seekpng.com/png/detail/506-5061704_cool-profile-avatar-picture-cool-picture-for-profile.png" width='50px' height='50px'/>
            </a>
            {user.name}
        </div>
    )
}

