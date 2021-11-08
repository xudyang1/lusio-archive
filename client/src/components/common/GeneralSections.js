import React, { Component } from "react";
import AchievementCard from "./AchievementCard";
import QuizCardWraper from "./QuizCardWraper";

function getCards(t, index, element) {
    console.log("called getCards with type: ", t)
    if (t == "quiz")
        return (
            <QuizCardWraper key={index} id={index} name={element[0]} desc={element[1]} />
        )
    if (t == "achievement")
        return (
            <AchievementCard key={index} id={index} name={element[0]} desc={element[1]} />
        )
    if (t == "subUser")
        return (
            <QuizCardWraper key={index} id={index} name={element[0]} desc={element[1]} />
        )
    if (t == "subPlat")
        return (
            <QuizCardWraper key={index} id={index} name={element[0]} desc={element[1]} />
        )
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
                    // if(type == "quiz")
                    items.map((element, index) => (
                        //<QuizCardWraper key={index} id={index} name={element[0] + " from " + this.props.name} desc={element[1]} />
                        getCards(type, index, element)
                    ))
                }
            </div>
        </div>
    )
}
