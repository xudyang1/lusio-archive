import React, { Component, createRef, useEffect } from "react";
import QuizCards from "./QuizCard";
import 'materialize-css';
import '../../css/frontpage.css'
import M from 'materialize-css';

export default function DailyChallengeSection() {


    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, { edge: "right" });
    }, []);

    var s = {
        position: 'fixed',
        top: "50%",
        left: "92%",
        width: "110px",
        height: "110px",
        lineHeight: "18px",
        fontSize: "14px"
    }

    return (
        // <div className="dailyChallenge">
        //     <div className="col s12">
        //         <div className="row z-depth-3">
        //             <h4>Daily Challenge</h4>
        //             <QuizCards key={1} id={1} name={"Awesome Daily Challenge"} desc={"featured quiz of the day, take a challenge now, I dare you"} />
        //             <h4>Scoreboard</h4>
        //         </div>
        //     </div>
        // </div>
        <div className="dailyChallenge center">
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