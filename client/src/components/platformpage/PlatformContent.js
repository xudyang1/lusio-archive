import M from "materialize-css";
import { createRef, useContext, useEffect, useState } from "react"
import { PlatformContext } from "../../context/PlatformState"
import { QUIZ_CARD } from "../../types/cardTypes"
import GeneralSections from "../sections/GeneralSections"
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom"
import SectionList from "../sections/SectionList"
import AddQuizToPlatButton from "../sections/AddQuizToPlatButton"
import RemoveQuizFromPlatButton from "../sections/RemoveQuizFromPlatButton"

export default function PlatformContent(props) {
    const sections = props.sections
    const auth = props.auth
    const id = props.id

    const { updatePlatform, platform } = useContext(PlatformContext)
    const [view, setView] = useState("Sections")

    const tabsref = createRef()

    var security = 0
    switch (auth) {
        case "OWNER_VIEW":
            security = 2
            break;
        case "ADMIN_VIEW":
            security = 1
            break;
        default:
            security = 0
            break;
    }

    function onClickAddSection() {
        const payload = {
            mode: "ADD",
            platform: {
                quizSections:
                {
                    sectionName: "New Section",
                    sectionIndex: platform.quizSections.length
                }
            }
        }
        updatePlatform(id, payload)
    }

    function onClickAddQuizToPlat(quizID) {
        if (!platform.quizzes.includes(quizID)) {
            const payload = {
                mode: "ADD",
                platform: {
                    quizzes:
                        quizID
                }
            }
            updatePlatform(id, payload)
        }
        else {
            alert("this quiz is already in the platform");
        }
    }

    function onClickRemoveQuizFromPlat(quizID) {
        const payload = {
            mode: "DELETE",
            platform: {
                quizzes:
                    quizID
            }
        }
        updatePlatform(id, payload)
    }

    function getSections() {
        let res = []
        for (let i = 0; i < sections.length; i++) {
            let quizIDs = []
            let data = sections[i]
            console.log("data", data)
            data.sectionQuizzes.forEach(element => {
                quizIDs.push(element.quiz)
            });
            res.push(<GeneralSections key={i} name={data.sectionName} security={security} index={data.sectionIndex} platformID={id} element={quizIDs} sectionID={data._id} type={QUIZ_CARD} />)
        }
        return res
    }

    function getList() {
        return <SectionList name={"All Quizzes"} items={platform.quizzes} type={QUIZ_CARD} />
    }

    function viewPage() {
        switch (view) {
            case "Sections":
                return getSections()
            case "Allquizzes":
                return getList();
        }
    }

    useEffect(() => {
        var instance = M.Tabs.init(tabsref.current, {});
    }, [])

    return (
        <div>
            <div class="row">
                <div class="col s12">
                    <ul class="tabs" ref={tabsref}>
                        <li className="tab col s3"><a style={{ fontSize: "24px" }} onClick={() => { setView("Sections") }}>Front Page</a></li>
                        <li className="tab col s3"><a style={{ fontSize: "24px" }} onClick={() => { setView("Allquizzes") }}>All Quizzes</a></li>
                    </ul>
                </div>
            </div>
            {
                viewPage()
            }
            {security > 0 && view === "Sections" ? <a className="waves-effect waves-light btn" onClick={onClickAddSection}><i className="material-icons left">add</i>Add Section</a> : <div></div>}
            {security > 0 && view === "Allquizzes" ?
                <div style={{ display: "inline-flex" }}>
                    <AddQuizToPlatButton addQuizToPlatform={onClickAddQuizToPlat} />
                    <RemoveQuizFromPlatButton removeQuizFromPlatform={onClickRemoveQuizFromPlat} />
                </div> : <div></div>}
        </div>
    )
}