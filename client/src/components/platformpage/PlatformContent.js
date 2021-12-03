import { useContext } from "react"
import { PlatformContext } from "../../context/PlatformState"
import { QUIZ_CARD } from "../../types/cardTypes"
import GeneralSections from "../sections/GeneralSections"

export default function PlatformContent(props) {
    const sections = props.sections
    const auth = props.auth
    const id = props.id

    const { updatePlatform, platform } = useContext(PlatformContext)

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

    return (
        <div>
            {
                // sections.map((element, index) => (
                //     <GeneralSections key={index} name={element.sectionName} security={security} index={element.sectionIndex} platformID={id} element={element.sectionQuizzes} sectionID={element._id} type={QUIZ_CARD} />
                // ))
                getSections()
            }
            {
                security > 0 ? <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons" onClick={onClickAddSection}>add</i></a> : <div></div>
            }
        </div>
    )
}