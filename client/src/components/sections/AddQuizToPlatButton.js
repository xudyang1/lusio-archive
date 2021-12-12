import M from "materialize-css";
import { createRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { PlatformContext } from "../../context/PlatformState";
import { ProfileContext } from "../../context/ProfileState";

export default function AddQuizToPlatButton(props) {
    const addQuizToPlatform = props.addQuizToPlatform

    const { user } = useContext(AuthContext)
    const { profile, getProfile } = useContext(ProfileContext)
    const { platform } = useContext(PlatformContext)
    const [listID, setListID] = useState([])

    const selector = createRef();

    var elems2 = document.querySelectorAll('select');

    function createOptions() {
        let opts = []
        listID.forEach((element, index) => {
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

        setListID(profile.quizzesCreated)
    }, [])

    useEffect(() => {
        M.FormSelect.init(elems2, {});
    }, [listID])

    return (
        <div>
            <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#addQuizToPlatformModal"><i className="material-icons">add</i></a>
            <div id="addQuizToPlatformModal" className="modal">
                <div className="modal-content">
                    <h4>Add A Quiz to This Platform</h4>
                    <h6>Select a quiz to add to this platform</h6>
                    <div className="row">
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
                    </div>
                </div>
            </div>
        </div>
    )
}