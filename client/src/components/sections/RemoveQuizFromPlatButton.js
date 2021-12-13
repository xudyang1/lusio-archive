import M from "materialize-css";
import { createRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { PlatformContext } from "../../context/PlatformState";
import { ProfileContext } from "../../context/ProfileState";
import { QuizzesContext } from "../../context/QuizState";

export default function RemoveQuizFromPlatButton(props) {
    const removeQuizFromPlatform = props.removeQuizFromPlatform

    const { platform } = useContext(PlatformContext)
    const { getQuizzesById } = useContext(QuizzesContext)
    const [listID, setListID] = useState([])
    const [platformQuizBank, setPlatformBank] = useState([])

    const selector2 = createRef();

    function createOptions2() {
        let opts = []
        platformQuizBank.forEach((element, index) => {
            opts.push(<option value={element._id} key={index}>{element.name + " -- author: " + element.author}</option>)
        })
        return opts
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            dismissible: true
        });

        getQuizzesById(platform.quizzes).then(function (result) {
            console.log(result)
            if (result)
                setPlatformBank([...result])
        })
    }, [])

    useEffect(() => {
        getQuizzesById(platform.quizzes).then(function (result) {
            console.log("RESULT", result)
            if (result)
                setPlatformBank([...result])
        })
    }, [platform.quizzes])

    useEffect(() => {
        //console.log("UPDATED PLATFORM QUIZZES")
        M.FormSelect.init(selector2.current, {});
    }, [platformQuizBank])

    return (
        <div className="col s1">
            <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#removeQuizFromPlatformModal"><i className="material-icons">remove</i></a>
            <div id="removeQuizFromPlatformModal" className="modal">
                <div className="modal-content">
                    <h4>Remove a Quiz From Platform</h4>
                    <h6>Select a quiz to remove from this platform</h6>
                    <div className="row">
                        <div className="input-field col s9">
                            <select defaultValue="" ref={selector2}>
                                {createOptions2()}
                            </select>
                        </div>
                        <div className="col s1">
                            <input className="modal-close" style={{ width: "100px" }} type="button" defaultValue="Submit" onClick={() => {
                                removeQuizFromPlatform(selector2.current.value)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}