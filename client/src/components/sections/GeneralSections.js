import React, { createRef, useEffect, useState, useContext, useReducer } from "react";
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCards from "../frontpage/QuizCard";
import "../../css/frontpage.css"
import AdddItemCard from "./AddItemCard";
import { ProfileContext } from "../../context/ProfileState";
import PlatformCard from "./PlatformCard";
import { PlatformContext } from "../../context/PlatformState";
import AdjustableQuizCard from "./AdjustableQuizCard";
import AddQuizToSectionButton from "./AddQuizToSectionButton";
import ConfirmModal from "../common/ConfirmModal";
import { QuizzesContext } from "../../context/QuizState";

import { getAllBadges, getBadgesByIds } from "../../actions/AchievementActions";
import { achievementInitialState, AchievementReducer } from "../../reducers/AchievementReducer";

import sampleAchievement from "../../sampleData/sampleAchievement.json"
import AchievementManager from "../../utils/AchievementManager"

/**
 * Return and displays the corresponding card given card type and card information
 * 
 * @param {CARD_TYPE} t ACHIEVEMENT_CARD | QUIZ_CARD | SUB_PLAT_CARD | SUB_USER_CARD
 * @param {Number} index index of the element, used for DOM unique key
 * @param {JSON} element the actual card information {id, name, description}
 * @param {Boolean} canEdit set true if type == QUIZ_CARD && view_type == owner_view
 * @returns 
 */
function getCards(t, index, element, args = false) {
    //console.log("ELEMENT", element)
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
/**
 * 
 * @param {prop} props takes 
 * element (list of id), 
 * type (QUIZ_CARD)
 * name (String, name of the section),
 * 
 * security, 0 by default if 0 cannot edit
 * platformID the platform id of the section
 * sectionID the section id in platform
 * index the sectionIndex in platform, 0 if profile
 * 
 * profileID the profile id of the user
 * 
 * @returns 
 */
export default function GeneralSections(props) {
    //console.log(props.element)

    /**
     * @todo get items from database
     */
    const items = [
        { id: '1', name: 'Q1', description: 'Description for Q1', author: 'Qwert', platform_id: '1', likes: 4, created: new Date('2010/01/22') },
        { id: '2', name: 'Q2', description: 'Description for Q2', author: 'qazx', platform_id: '2', likes: 1, created: new Date('2010/01/21') },
        { id: '3', name: 'Q3', description: 'Description for Q3', author: 'sktop', platform_id: '2', likes: 10, created: new Date('2021/10/22') },
        { id: '4', name: 'Qtop', description: 'Description for Q4', author: 'desktop', platform_id: '3', likes: 0, created: new Date('2021/01/22') },
        { id: '5', name: 'Q25', description: 'Description for Q25 really really really really really really really really really really reallyreally long description', author: 'shinetop', platform_id: '3', likes: 200, created: new Date('2021/01/22') }
    ]
    const name = props.name ? props.name : "SectionName"
    const type = props.type ? props.type : QUIZ_CARD

    const [editing, setEditing] = useState(false)
    const [quizzesInSection, setQuizzesInSection] = useState([])

    const { viewType, profile } = useContext(ProfileContext)
    const { updatePlatform } = useContext(PlatformContext)
    const { getQuizzes, getQuiz } = useContext(QuizzesContext)

    const Section = createRef();
    const sectionName = createRef();
    const platformID = props.platformID

    const [achievements, dispatch] = useReducer(AchievementReducer, achievementInitialState)


    /**
     * @todo Edit Section Name, update SectionQuizzes
     */
    function onClickConfirm() {
        setEditing(false)
        //console.log("quizzesInSection", quizzesInSection)
        const arrofID = quizzesInSection.map((element, index) => {
            return { quiz: element._id, quizIndex: index }
        })
        const payload = {
            mode: "EDIT",
            platform: {
                quizSections: {
                    _id: props.sectionID,
                    sectionName: sectionName.current.value,
                    sectionQuizzes: arrofID
                }
            }
        }
        //console.log(payload)
        updatePlatform(platformID, payload)
    }

    /**
     * OnClick function - Delete Section on Platform
     */
    function onClickDeleteSection() {
        const payload = {
            mode: "DELETE",
            platform: {
                quizSections: { _id: props.sectionID }
            }
        }
        updatePlatform(platformID, payload)
    }

    /**
     * @todo Remove Quiz From Section
     * 
     * @param {Number} index the index of the quiz in the sectionQuizzes
     */
    function removeQuizFromSection(index) {
        console.log("QUIZ WITH INDEX ", index, " NEEDS TO BE REMOVED")
        let temp = quizzesInSection
        temp.splice(index, 1)
        setQuizzesInSection([...temp])
        const arrofID = quizzesInSection.map((element, index) => {
            return { quiz: element._id, quizIndex: index }
        })
        const payload = {
            mode: "EDIT",
            platform: {
                quizSections: {
                    _id: props.sectionID,
                    sectionName: sectionName.current.value,
                    sectionQuizzes: arrofID
                }
            }
        }
        //console.log(payload)
        updatePlatform(platformID, payload)
    }

    function addQuizToSection(quizID) {
        let temp = quizzesInSection
        getQuiz(quizID, false).then(function (result) {
            temp.push(result.data)
            setQuizzesInSection([...temp])
        })
        //console.log(quizzesInSection)
    }

    function addQuizToPlatform(quizID) {
        const payload = {
            mode: "ADD",
            platform: {
                quizzes:
                    quizID
            }
        }
        updatePlatform(platformID, payload)
    }

    function itemSwapUp(quizIndex) {
        console.log("MOVEING QUIZ UP FROM ", quizIndex, " to ", quizIndex - 1)
        let temp = quizzesInSection[quizIndex]
        let tempArr = quizzesInSection
        tempArr[quizIndex] = tempArr[quizIndex - 1]
        tempArr[quizIndex - 1] = temp
        setQuizzesInSection([...tempArr])
    }

    function itemSwapDown(quizIndex) {
        console.log("MOVEING QUIZ DOWN FROM ", quizIndex, " to ", quizIndex + 1)
        let temp = quizzesInSection[quizIndex]
        let tempArr = quizzesInSection
        tempArr[quizIndex] = tempArr[quizIndex + 1]
        tempArr[quizIndex + 1] = temp
        setQuizzesInSection([...tempArr])
    }

    function itemMoveTop(quizIndex) {
        console.log("MOVEING QUIZ TO TOP")
        let temp = quizzesInSection[quizIndex]
        let tempArr = quizzesInSection
        tempArr.splice(quizIndex, 1)
        tempArr.unshift(temp)
        setQuizzesInSection([...tempArr])
    }

    function itemMoveBot(quizIndex) {
        console.log("MOVEING QUIZ TO BOT")
        let temp = quizzesInSection[quizIndex]
        let tempArr = quizzesInSection
        tempArr.splice(quizIndex, 1)
        tempArr.push(temp)
        setQuizzesInSection([...tempArr])
    }

    const getQuizList = async (listOfId) => {
        const quizzes = () => {
            return getQuizzes()
                .then(function (result) {
                    return result;
                })
        }
        const quizL = await quizzes();
        //console.log(quizL)
        //console.log(listOfId)
        const quiz = listOfId.map((element) => {
            return quizL.data.find(ele => ele._id == element)
        })
        //const quiz = quizL.data.filter(q => listOfId.includes(q._id));
        return quiz;
    }

    useEffect(() => {
        if (props.element) {
            switch (type) {
                case QUIZ_CARD: {
                    //console.log("PROPS", props.element)
                    let quizzes = getQuizList(props.element).then(function (result) {
                        setQuizzesInSection(result)
                    })
                } break;
                case ACHIEVEMENT_CARD: {
                    AchievementManager.setProfile(profile)
                    setQuizzesInSection(sampleAchievement.achievements.filter(element =>
                        AchievementManager.evaluateAchievement(element)
                    ))

                    //console.log("LISTS OF IDS:", props.element)
                    // getBadgesByIds(props.element)(dispatch).then(function (result) {
                    //     console.log(achievements)
                    //     setQuizzesInSection(achievements.badges)
                    // })
                } break;
            }
        }
        //setQuizzesInSection(items)
    }, [props.element])

    return (
        <div>
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div className="row">
                        <h4>
                            <div>{editing ?
                                <div className="input-field">
                                    <input type="text" defaultValue={name} ref={sectionName} />
                                </div>
                                : name}
                            </div>
                            {/* {props.security > 0 ? <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => onClickDeleteSection(sectionID)}><i className="material-icons">delete</i></a> : <div></div>} */}
                            {props.security > 0 ? <ConfirmModal
                                key={props.sectionID} id={props.sectionID}
                                msgTitle={"Confirm Delete Section"}
                                msgBody={"This Action is Irreversible, Are you sure you want to delete?"}
                                callback={() => onClickDeleteSection()}
                                button={<a className="right btn-floating btn-small waves-effect waves-light red modal-trigger" href={"#" + props.sectionID + "confirmModal"} style={{ fontSize: "0em" }} ><i className="material-icons">delete</i></a>} />
                                : <div></div>}

                            {/* {props.security > 0 ? <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons">expand_less</i></a> : <div></div>}
                            {props.security > 0 ? <a className="right btn-floating btn-small waves-effect waves-light blue"><i className="material-icons">expand_more</i></a> : <div></div>} */}
                            {props.security > 0 && !editing ? <a className="right btn-floating btn-small waves-effect waves-light green" onClick={() => { setEditing(true) }}><i className="material-icons">edit</i></a> : <div></div>}
                            {props.security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light red" onClick={() => { setEditing(false) }}><i className="material-icons">clear</i></a> : <div></div>}
                            {props.security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light green" onClick={() => onClickConfirm()}><i className="material-icons">check</i></a> : <div></div>}

                        </h4>
                        {props.homeContent ? <a href={"/platform/" + props.platformID}>more{">"}{">"}</a> : <div></div>}
                        {props.profileID ? <a href={"/profile/" + props.profileID + "/allquiz"}>more{">"}{">"}</a> : <div></div>}

                    </div>
                    {editing ? <div>
                        {
                            quizzesInSection.map((element, index) => (
                                <AdjustableQuizCard key={index} position={index} quizData={element} end={quizzesInSection.length - 1} moveUp={itemSwapUp} moveDown={itemSwapDown} delete={removeQuizFromSection} moveTop={itemMoveTop} moveBot={itemMoveBot} />
                            ))
                        }
                        <AddQuizToSectionButton key={props.element._id} addQuizToSection={addQuizToSection} addQuizToPlatform={addQuizToPlatform} />
                    </div> :
                        <div className="valign-wrapper">
                            {quizzesInSection.length > 3 ? <a className="left" onClick={() => { Section.current.scrollBy(-1000, 0) }}><i className="material-icons">chevron_left</i></a> : <div></div>}
                            <div className="GSection" ref={Section}>
                                {
                                    quizzesInSection.map((element, index) => (
                                        getCards(type, index, element, viewType == "OWNER_VIEW")
                                    ))
                                }
                            </div>
                            {quizzesInSection.length > 3 ? <a className="right" onClick={() => { Section.current.scrollBy(1000, 0) }}><i className="material-icons">chevron_right</i></a> : <div></div>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
