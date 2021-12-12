import M from "materialize-css";
import { createRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { PlatformContext } from "../../context/PlatformState";
import { ProfileContext } from "../../context/ProfileState";
import { QuizzesContext } from "../../context/QuizState";

export default function AddQuizToSectionButton(props) {
    const addQuizToPlatform = props.addQuizToPlatform
    const addQuizToSection = props.addQuizToSection

    const { platform } = useContext(PlatformContext)
    const { getQuizzesById } = useContext(QuizzesContext)
    const [listID, setListID] = useState([])
    const [platformQuizBank, setPlatformBank] = useState([])

    const selector = createRef();
    const selector2 = createRef();

    //var elems2 = document.querySelectorAll('select');

    function createOptions2() {
        let opts = []
        platformQuizBank.forEach((element, index) => {
            opts.push(<option value={element._id} key={index}>{element.name+" -- author: "+element.author}</option>)
        })
        return opts
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            dismissible: true
        });

        getQuizzesById(platform.quizzes).then(function(result){
            console.log(result)
            setPlatformBank(result)
        })
    }, [])

    useEffect(()=>{
        getQuizzesById(platform.quizzes).then(function(result){
            console.log(result)
            setPlatformBank(result)
        })
    }, [platform.quizzes])

    useEffect(() => {
        M.FormSelect.init(selector2.current, {});
    }, [platformQuizBank])

    return (
        <div>
            <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#addQuizToSectionModal"><i className="material-icons">add</i></a>
            <div id="addQuizToSectionModal" className="modal">
                <div className="modal-content">
                    <h4>Add A Quiz to This Section</h4>
                    <h6>First add your quiz to the platform quiz bank</h6>
                    {/* <div className="row">
                        <div className="input-field col s9">
                            <select defaultValue="" ref={selector}>
                                {createOptions()}
                            </select>
                        </div>
                        <div className="col s1">
                            <input className="modal-close" style={{ width: "100px" }} type="button" defaultValue="Submit" onClick={() => {
                                addQuizToPlatform(selector.current.value)
                            }} />
                        </div>
                    </div> */}
                    <h6>Then add a quiz to this section</h6>
                    <div className="row">
                        <div className="input-field col s9">
                            <select defaultValue="" ref={selector2}>
                                {createOptions2()}
                            </select>
                        </div>
                        <div className="col s1">
                            <input className="modal-close" style={{ width: "100px" }} type="button" defaultValue="Submit" onClick={() => {
                                addQuizToSection(selector2.current.value)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}