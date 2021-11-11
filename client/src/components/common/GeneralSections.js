import React, { Component, useEffect, useState } from "react";
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCardWraper from "./QuizCardWraper";
import QuizCards from "../frontpage/QuizCard";
import "../../css/frontpage.css"
import M from 'materialize-css';

function getCards(t, index, element) {
    console.log("called getCards with type: ", t)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="carousel-item" key={index}><AchievementCard key={index} id={index} name={element[0]} desc={element[1]} /></div>
        case QUIZ_CARD:
            return <div className="carousel-item" key={index}><QuizCards key={index} id={index} name={element[0]} desc={element[1]} /></div>
        case SUB_PLAT_CARD:
            break;
        case SUB_USER_CARD:
            break;
    }
}

// function getSectionPage(listOfCards, cardsPerPage) {
//     return (
//         <div className="col">
//             HI
//         </div>
//     )
// }

// function pageControl(state, setState) {
//     if (state.currentPage > state.maxPage || state.currentPage < 0)
//         setState({ currentPage: 0 })
//     if (state.cardsPerPage == 0)
//         setState({ beginning: true })
//     else
//         setState({ beginning: false })
//     if (state.cardsPerPage == state.maxPage)
//         setState({ end: true })
//     else
//         setState({ end: false })
// }

export default function GeneralSections(props) {

    // const initialState = {
    //     numCards: 0,
    //     cardsPerPage: 2,
    //     currentPage: 0,
    //     maxPage: 0,
    //     beginning: true,
    //     end: true,
    //     cards: []
    // }

    // const [state, setState] = useState(initialState);

    const items = props.items ? props.items :
        [["Quiz1", "Description for Q1"], ["Quiz2", "Something Something"], ["Quiz3", "No Description"], ["Quiz4", "No Description"], ["Quiz5", "No Description"], ["Quiz6", "No Description"], ["Quiz7", "No Description"], ["Quiz8", "No Description"], ["Quiz9", "No Description"], ["Quiz10", "No Description"]]

    var name = props.name ? props.name : "SectionName"
    var type = props.type ? props.type : "quiz"

    useEffect(()=>{
        const options = {
            numVisible: 8,
            dist: -50,
            padding: 100,
            indicators: true,
            shift: 100,
        }
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, options);
    })

    // useEffect(() => {
    //     console.log(state)
    //     //console.log(items)
    //     setState((prev) => ({ ...prev, numCards: items.length }));
    //     setState((prev) => ({ ...prev, cards: items }));
    //     setState((prev) => ({ ...prev, maxPage: Math.ceil(items.length / state.cardsPerPage) }));
    //     pageControl()
    // }, [])

    // const pageControl = () => {
    //     console.log("call pageControl")
    //     if (state.currentPage > state.maxPage || state.currentPage < 0)
    //         setState((prev) => ({ ...prev, currentPage: 0 }));
    //     if (state.currentPage == 0)
    //         setState((prev) => ({ ...prev, beginning: true }));
    //     else
    //         setState((prev) => ({ ...prev, beginning: false }));
    //     if (state.currentPage == state.maxPage)
    //         setState((prev) => ({ ...prev, end: true }));
    //     else
    //         setState((prev) => ({ ...prev, end: false }));
    // }

    // const pageUp = (e) => {
    //     console.log(state)
    //     if (!state.beginning)
    //         if (state.currentPage < state.maxPage) {
    //             console.log("call pageup")
    //             setState((prev) => ({ ...prev, currentPage: state.currentPage + 1 }));
    //         }

    // }
    // const pageDown = (e) => {
    //     console.log(state)
    //     if (!state.end)
    //         if (state.currentPage < state.maxPage) {
    //             console.log("call pagedown")
    //             setState((prev) => ({ ...prev, currentPage: state.currentPage - 1 }));
    //         }

    // }

    return (
        <div>
            <div className="row z-depth-3">
                <div>
                    <h4>{name}</h4>
                    <a>more{">"}{">"}</a>
                </div>
                {/* <div>
                    <div className="left" onClick={pageUp}><a href="#!"><i className="material-icons">chevron_left</i></a></div>

                    <div className="right" onClick={pageDown}><a href="#!"><i className="material-icons">chevron_right</i></a></div>
                </div>
                {getSectionPage()} */}
                <div className="carousel center" style={{height: "300px"}}>
                    {
                        items.map((element, index) => (
                            getCards(type, index, element)
                        ))
                    }
                    <div className="carousel-fixed-item center">
                        <button className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></button>
                        <button className=""><a href="#!"><i className="material-icons">chevron_right</i></a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
