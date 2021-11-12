import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCards from "../frontpage/QuizCard";
import { useContext } from "react";
import { QuizzesContext } from "../../context/QuizState";

function getCards(t, index, element) {
    console.log("called getCards with type: ", t)
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

export default function SectionList(props){

    const {getQuiz} = useContext(QuizzesContext)

    const items = props.items ? props.items :
        [["Quiz1", "Description for Q1"], ["Quiz2", "Something Something"], ["Quiz3", "A loooooooooooooooooooooot of Stuff in description"], ["Quiz4", "No Description"], ["Quiz5", "No Description"], ["Quiz6", "No Description"], ["Quiz7", "No Description"], ["Quiz8", "No Description"], ["Quizteye6yuftjguykjuykghkiuhkiugkukg9", "No Description"], ["Quiz103894 037659023465", "No Description"]]
    items.map(element => {
        var quiz = getQuiz(element)
        return [quiz.name, quiz.description]
    });
    const name = props.name ? props.name : ""
    console.log(props.items)

    return(
        <div>
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>{name}</h4>
                    </div>
                    <div className="valign-wrapper">
                        <div className="LSection">
                            {
                                items.map((element, index) => (
                                    getCards(props.type, index, element)
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}