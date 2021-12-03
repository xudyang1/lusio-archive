import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCards from "../frontpage/QuizCard";
import { useContext, useEffect, useState } from "react";
import { QuizzesContext } from "../../context/QuizState";
import AddItemCard from "./AddItemCard";
import { PlatformContext } from "../../context/PlatformState";
import PlatformCard from "./PlatformCard";
import { CreateQuizButton } from "../editquizpage/CreateQuizButton";
import { ProfileContext } from "../../context/ProfileState";
import { useForceUpdate } from "../../utils/useForceUpdate";

function getCards(t, index, element, args = false) {
    console.log("ELEMENT", element)
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><AchievementCard key={index} element={element} achieved={args} /></div>
        case QUIZ_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><QuizCards key={index} element={element} canEdit={args} /></div>
        case SUB_PLAT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><PlatformCard key={index} element={element} /></div>
        case SUB_USER_CARD:
            break;
    }
}

export default function SectionList(props) {

    const { getPlatformList } = useContext(PlatformContext)
    const { getQuizzes } = useContext(QuizzesContext)
    const { viewType } = useContext(ProfileContext)

    const name = props.name ? props.name : ""
    const achievementList = []
    const [items, setItems] = useState([])

    const getQuizList = async (listOfId) => {
        const quizzes = () => {
            return getQuizzes()
                .then(function (result) {
                    return result;
                })
        }
        const quizL = await quizzes();
        const quiz = quizL.data.filter(q => listOfId.includes(q._id));
        return quiz;
    }

    const getPlatforms = async (listOfId) => {
        const quizzes = () => {
            return getPlatformList()
                .then(function (result) {
                    return result;
                })
        }
        const plats = await quizzes();
        return plats.platforms.filter(p => listOfId.includes(p._id))
        // const quiz = quizL.data.filter(q => listOfId.includes(q._id));
        // return quiz;
    }

    function renderSwitch() {
        switch (props.callback) {
            case "createQuiz":
                return <CreateQuizButton />
            case "createPlat":
                return <AddItemCard callback={props.callbackFunc} />
        }
    }

    useEffect(() => {
        if (props.items) {
            switch (props.type) {
                case QUIZ_CARD: {
                    let quizzes = getQuizList(props.items).then(function (result) {
                        setItems(result)
                    })
                } break;
                case SUB_PLAT_CARD: {
                    let plats = getPlatforms(props.items).then(function (result) {
                        console.log(result)
                        setItems(result)
                    })
                } break;
                case ACHIEVEMENT_CARD: {
                    console.log(props.items)
                } break;
            }
        }
    }, [props.items])

    function getList(list, type) {
        let res = []
        switch (type) {
            case QUIZ_CARD: {
                list.map((element, index) => (
                    res.push(getCards(props.type, index, element, viewType == "OWNER_VIEW"))
                ))
            } break;
            case SUB_PLAT_CARD: {
                list.map((element, index) => (
                    res.push(getCards(props.type, index, element))
                ))
            } break;
            case ACHIEVEMENT_CARD: {
                achievementList.map((element, index) => (
                    res.push(getCards(props.type, index, element, list.includes(element)))
                ))
            } break;
        }
        return res
    }

    return (
        <div>
            {renderSwitch()}
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>{name}</h4>
                    </div>
                    <div className="valign-wrapper">
                        <div className="LSection">
                            {/* {
                                items.map((element, index) => (
                                    getCards(props.type, index, element, viewType == "OWNER_VIEW")
                                ))
                            } */}
                            {
                                getList(items, props.type)
                            }
                            {/* {callback == "createQuiz" ? <CreateQuizButton /> : <div></div>}
                            {callback == "createPlat" ? <AddItemCard callback={props.callbackFunc} /> : <div></div>} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}