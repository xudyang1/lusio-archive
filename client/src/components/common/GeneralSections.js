import React, { Component, createRef, useEffect, useState } from "react";
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCardWraper from "./QuizCardWraper";
import QuizCards from "../frontpage/QuizCard";
import "../../css/frontpage.css"
import M from 'materialize-css';

function getCards(t, index, element, options) {
    console.log("called getCards with type: ", t)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="GSection-Cards center" key={index} id={options + index}><AchievementCard key={index} id={index} name={element[0]} desc={element[1]} /></div>
        case QUIZ_CARD:
            return <div className="GSection-Cards center" key={index} id={options + index}><QuizCards key={index} id={index} name={element[0]} desc={element[1]} /></div>
        case SUB_PLAT_CARD:
            break;
        case SUB_USER_CARD:
            break;
    }
}

export default function GeneralSections(props) {

    const [page, setState] = useState(0);

    const items = props.items ? props.items :
        [["Quiz1", "Description for Q1"], ["Quiz2", "Something Something"], ["Quiz3", "A loooooooooooooooooooooot of Stuff in description"], ["Quiz4", "No Description"], ["Quiz5", "No Description"], ["Quiz6", "No Description"], ["Quiz7", "No Description"], ["Quiz8", "No Description"], ["Quizteye6yuftjguykjuykghkiuhkiugkukg9", "No Description"], ["Quiz103894 037659023465", "No Description"]]

    var name = props.name ? props.name : "SectionName"
    var type = props.type ? props.type : "quiz"

    const SectionTitle = createRef();

    const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

    const pageUp = (e) => {
        console.log(page)
        if (page > 0)
            setState(clampNumber(page - 2, 0, items.length-1))
        //SectionTitle.current.scrollIntoView()
    }

    const pageDown = (e) => {
        console.log(page)
        if (page < items.length)
            setState(clampNumber(page + 2, 0, items.length-1))
        //SectionTitle.current.scrollIntoView()
    }

    return (
        <div>
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>{name}</h4>
                        <a href="">more{">"}{">"}</a>
                    </div>
                    <div className="valign-wrapper">
                        <a className="left" href={"#" + name + page} onClick={pageUp}><i className="material-icons">chevron_left</i></a>
                        <div className="GSection">
                            {
                                items.map((element, index) => (
                                    getCards(type, index, element, name)
                                ))
                            }
                        </div>
                        <a className="right" href={"#" + name + page} onClick={pageDown}><i className="material-icons">chevron_right</i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
