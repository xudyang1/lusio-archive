import React, { Component, createRef, useEffect } from "react";
import QuizCards from "./QuizCard";
import 'materialize-css';
import '../../css/frontpage.css'
import M from 'materialize-css';

export default function DailyChallengeSection() {
    var s = {
        position: 'fixed',
        top: "50%",
        left: "92%",
        width: "110px",
        height: "110px",
        lineHeight: "18px",
        fontSize: "14px"
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, { edge: "right" });
    })

    return (
        <div className="center">
            <ul id="slide-out" className="sidenav">
                <div className="row z-depth-3">
                    <h4>Daily Challenge</h4>
                    <QuizCards key={1} id={1} name={"Awesome Daily Challenge"} desc={"featured quiz of the day, take a challenge now, I dare you"} />
                    <h4>Scoreboard</h4>
                </div>
            </ul>
            <a href="#" data-target="slide-out" className="btn-floating btn-large waves-effect waves-light red sidenav-trigger" style={s}><i className="material-icons">announcement</i>Daily Challenge</a>
        </div>
    )
}