import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCards from "../frontpage/QuizCard";
import PlatoformCard from "./PlatformCard";

function getCards(t, index, element) {
    console.log("CALLED GET CARDS")
    console.log("called getCards with type: ", t, element)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><AchievementCard key={index} id={index} name={element.name} desc={element.description} /></div>
        case QUIZ_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><QuizCards key={index} id={index} name={element.name} desc={element.description} /></div>
        case SUB_PLAT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><PlatoformCard key={index} id={index} name={element.name} desc={element.description} /></div>
        case SUB_USER_CARD:
            break;
    }
}


export default function SubSectionList(props) {
    return (
        <div>
            {
                props.items.map((element, index) => (
                    getCards(props.type, index, element)
                ))
            }
        </div>
    )
}