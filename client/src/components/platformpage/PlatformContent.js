
import { useContext, useEffect } from "react"
import { PlatformContext } from "../../context/PlatformState"
import GeneralSections from "../common/GeneralSections"

export default function PlatformContent(props) {
    const sections = props.sections
    const auth = props.auth
    const id = props.id

    const { updatePlatform, platform } = useContext(PlatformContext)

    console.log(sections)
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
    //console.log(auth)
    //console.log(security)

    function onClickAddSection() {
        console.log("Adding Section")
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
        //console.log(id)
        updatePlatform(id, payload)
    }

    return (
        <div>
            {
                sections.map((element, index) => (
                    <GeneralSections key={index} name={element.sectionName} security={security} index={element.sectionIndex} id={id} element={element}/>
                ))
            }
            {
                security > 0 ? <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons" onClick={onClickAddSection}>add</i></a> : <div></div>
            }
        </div>
    )
}