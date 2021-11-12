import React, { Component, createRef, useEffect, useState } from "react";
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCardWraper from "./QuizCardWraper";
import QuizCards from "../frontpage/QuizCard";
import "../../css/frontpage.css"
import M from 'materialize-css';

function getCards(t, index, element) {
    // console.log("called getCards with type: ", t)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><AchievementCard key={index} id={index} name={element[0]} desc={element[1]} /></div>
        case QUIZ_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><QuizCards key={index} id={index} name={element[0]} desc={element[1]} /></div>
        case SUB_PLAT_CARD:
            break;
        case SUB_USER_CARD:
            break;
    }
}

export default function GeneralSections(props) {


    const items = props.items ? props.items :
        [["Quiz1", "Description for Q1"], ["Quiz2", "Something Something"], ["Quiz3", "A loooooooooooooooooooooot of Stuff in description"], ["Quiz4", "No Description"], ["Quiz5", "No Description"], ["Quiz6", "No Description"], ["Quiz7", "No Description"], ["Quiz8", "No Description"], ["Quizteye6yuftjguykjuykghkiuhkiugkukg9", "No Description"], ["Quiz103894 037659023465", "No Description"]]

    var name = props.name ? props.name : "SectionName"
    var type = props.type ? props.type : "quiz"

    const Section = createRef();

    const pageUp = (e) => {
        Section.current.scrollBy(-1000, 0)
    }

    const pageDown = (e) => {
        Section.current.scrollBy(1000, 0)
    }

    return (
        <div>
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>{name}</h4>
                        <a href={"/platform/"+props.id}>more{">"}{">"}</a>
                    </div>
                    <div className="valign-wrapper">
                        <a className="left" onClick={pageUp}><i className="material-icons">chevron_left</i></a>
                        <div className="GSection" ref={Section}>
                            {
                                items.map((element, index) => (
                                    getCards(type, index, element)
                                ))
                            }
                        </div>
                        <a className="right" onClick={pageDown}><i className="material-icons">chevron_right</i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
