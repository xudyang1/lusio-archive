import React, { createRef, useEffect, useState, useContext } from "react";
import { ACHIEVEMENT_CARD, QUIZ_CARD, SUB_PLAT_CARD, SUB_USER_CARD } from "../../types/cardTypes";
import AchievementCard from "./AchievementCard";
import QuizCards from "../frontpage/QuizCard";
import "../../css/frontpage.css"
import AdddItemCard from "./AddItemCard";
import { ProfileContext } from "../../context/ProfileState";
import PlatformCard from "./PlatformCard";
import { PlatformContext } from "../../context/PlatformState";
import AdjustableQuizCard from "./AdjustableQuizCard";


/**
 * Return and displays the corresponding card given card type and card information
 * 
 * @param {CARD_TYPE} t ACHIEVEMENT_CARD | QUIZ_CARD | SUB_PLAT_CARD | SUB_USER_CARD
 * @param {Number} index index of the element, used for DOM unique key
 * @param {JSON} element the actual card information {id, name, description}
 * @param {Boolean} canEdit set true if type == QUIZ_CARD && view_type == owner_view
 * @returns 
 */
function getCards(t, index, element, canEdit) {
    switch (t) {
        case ACHIEVEMENT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><AchievementCard key={index} id={element.id} name={element.name} desc={element.description} /></div>
        case QUIZ_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><QuizCards key={index} id={element.id} name={element.name} desc={element.description} canEdit={canEdit} /></div>
        case SUB_PLAT_CARD:
            return <div className="GSection-Cards center" key={index} id={index}><PlatformCard key={index} id={element.id} name={element.name} desc={element.description} /></div>
        case SUB_USER_CARD:
            break;
    }
}

export default function GeneralSections(props) {

    /**
     * @todo get items from database
     */
    const items = [
        { id: '1', name: 'Q1', description: 'Description for Q1', author: 'Qwert', platform_id: '1', likes: 4, created: new Date('2010/01/22') },
        { id: '2', name: 'Q2', description: 'Description for Q2', author: 'qazx', platform_id: '2', likes: 1, created: new Date('2010/01/21') },
        { id: '3', name: 'Q3', description: 'Description for Q3', author: 'sktop', platform_id: '2', likes: 10, created: new Date('2021/10/22') },
        { id: '4', name: 'Qtop', description: 'Description for Q4', author: 'desktop', platform_id: '3', likes: 0, created: new Date('2021/01/22') },
        { id: '5', name: 'Q25', description: 'Description for Q25', author: 'shinetop', platform_id: '3', likes: 200, created: new Date('2021/01/22') }
    ]
    var name = props.name ? props.name : "SectionName"
    var type = props.type ? props.type : QUIZ_CARD
    var add = props.add ? props.add : false

    const [editing, setEditing] = useState(false)
    const [sectionData, setSectionData] = useState({})
    const [quizzesInSection, setQuizzesInSection] = useState([])

    const { viewType } = useContext(ProfileContext)
    const { updatePlatform } = useContext(PlatformContext)

    const Section = createRef();
    const sectionName = createRef();
    const platformID = props.id


    /**
     * @todo Edit Section Name
     */
    function onClickConfirm() {
        setEditing(false)
    }

    /**
     * OnClick function - Delete Section on Platform
     */
    function onClickDeleteSection() {
        const payload = {
            mode: "DELETE",
            platform: {
                quizSections: { _id: sectionData.id }
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
        console.log(quizzesInSection[index].name)
        console.log(quizzesInSection[index].description)
        console.log(quizzesInSection[index].author)
    }

    function itemSwapUp(quizIndex){
        console.log("MOVEING QUIZ UP FROM ", quizIndex, " to ", quizIndex-1)
        let temp = quizzesInSection[quizIndex]
        quizzesInSection[quizIndex] = quizzesInSection[quizIndex-1]
        quizzesInSection[quizIndex-1] = temp
    }

    function itemSwapDown(quizIndex){
        console.log("MOVEING QUIZ DOWN FROM ", quizIndex, " to ", quizIndex+1)
        let temp = quizzesInSection[quizIndex]
        quizzesInSection[quizIndex] = quizzesInSection[quizIndex+1]
        quizzesInSection[quizIndex+1] = temp
    }

    useEffect(() => {
        setSectionData(props.element)
        //setQuizzesInSection(props.element.sectionQuizzes)
        setQuizzesInSection(items)
    }, [sectionData])

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
                            {props.security > 0 ? <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => onClickDeleteSection()}><i className="material-icons">delete</i></a> : <div></div>}
                            {props.security > 0 ? <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => { setEditing(true) }}><i className="material-icons">edit</i></a> : <div></div>}
                            {props.security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light red" onClick={() => { setEditing(false) }}><i className="material-icons">clear</i></a> : <div></div>}
                            {props.security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light green" onClick={() => onClickConfirm()}><i className="material-icons">check</i></a> : <div></div>}
                        </h4>
                        {props.homeContent ? <a href={"/platform/" + props.id}>more{">"}{">"}</a> : <div></div>}

                    </div>
                    {editing ? <div>
                        {
                            quizzesInSection.map((element, index) => (
                                <AdjustableQuizCard key={index} position={index} quizData={element} end={items.length-1} moveUp={itemSwapUp} moveDown={itemSwapDown} delete={removeQuizFromSection}/>
                            ))
                        }
                    </div> :
                        <div className="valign-wrapper">
                            <a className="left" onClick={() => { Section.current.scrollBy(-1000, 0) }}><i className="material-icons">chevron_left</i></a>
                            <div className="GSection" ref={Section}>
                                {
                                    quizzesInSection.map((element, index) => (
                                        getCards(type, index, element, viewType == "OWNER_VIEW")
                                    ))
                                }
                                {add ? <AdddItemCard /> : <div></div>}
                            </div>
                            <a className="right" onClick={() => { Section.current.scrollBy(1000, 0) }}><i className="material-icons">chevron_right</i></a>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
