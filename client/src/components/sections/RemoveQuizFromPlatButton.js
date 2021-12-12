import M from "materialize-css";
import { createRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { PlatformContext } from "../../context/PlatformState";
import { ProfileContext } from "../../context/ProfileState";

export default function RemoveQuizFromPlatButton(props) {
    const removeQuizFromPlatform = props.removeQuizFromPlatform

    const { platform } = useContext(PlatformContext)
    const [listID, setListID] = useState([])
    const [platformQuizBank, setPlatformBank] = useState([])

    const selector2 = createRef();

    var elems2 = document.querySelectorAll('select');

    function createOptions2() {
        let opts = []
        platformQuizBank.forEach((element, index) => {
            opts.push(<option value={element} key={index}>{element}</option>)
        })
        return opts
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            dismissible: true
        });

        // var elems2 = document.querySelectorAll('select');
        // var instances2 = M.FormSelect.init(elems2, {});

        setPlatformBank(platform.quizzes)
    }, [])

    useEffect(() => {
        M.FormSelect.init(elems2, {});
    }, [platform.quizzes])

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