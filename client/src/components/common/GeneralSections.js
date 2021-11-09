import React, { Component } from "react";
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCardWraper from "./QuizCardWraper";

function getCards(t, index, element) {
    console.log("called getCards with type: ", t)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <AchievementCard key={index} id={index} name={element[0]} desc={element[1]} />
        case QUIZ_CARD:
            return <QuizCardWraper key={index} id={index} name={element[0]} desc={element[1]} />
        case SUB_PLAT_CARD:
            break;
        case SUB_USER_CARD:
            break;
    }
}


export default function GeneralSections(props) {
    var items = props.items ? props.items :
        [["Quiz1", "Description for Q1"], ["Quiz2", "Something Something"], ["Quiz3", "No Description"], ["Quiz4", "No Description"], ["Quiz5", "No Description"]]

    var name = props.name ? props.name : "SectionName"
    var type = props.type ? props.type : "quiz"

    return (
        <div className="row z-depth-3">
            <div>
                <h4>{name}</h4>
                <a>more{">"}{">"}</a>
            </div>
            <div className="col">
                {
                    items.map((element, index) => (
                        getCards(type, index, element)
                    ))
                }
            </div>
        </div>
    )
}
