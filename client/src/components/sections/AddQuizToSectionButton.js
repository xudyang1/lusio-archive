import M from "materialize-css";
import { createRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { PlatformContext } from "../../context/PlatformState";
import { ProfileContext } from "../../context/ProfileState";

export default function AddQuizToSectionButton(props) {
    const addQuizToPlatform = props.addQuizToPlatform
    const addQuizToSection = props.addQuizToSection



    const { user } = useContext(AuthContext)
    const { profile, getProfile } = useContext(ProfileContext)
    const { platform } = useContext(PlatformContext)
    const [listID, setListID] = useState([])
    const [platformQuizBank, setPlatformBank] = useState([])

    const selector = createRef();
    const selector2 = createRef();

    var elems2 = document.querySelectorAll('select');

    // function loadOptions() {
    //     while (selector.current.options.length) {
    //         selector.current.options.remove(selector.current.options.length - 1)
    //     }
    //     listID.map((element, index) => {
    //         selector.current.options.add(new Option(element, element))
    //     })
    //     var instances2 = M.FormSelect.init(elems2, {});
    // }

    function createOptions() {
        let opts = []
        listID.forEach((element, index) => {
            opts.push(<option value={element} key={index}>{element}</option>)
        })
        return opts
    }

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
            dismissible: true,
            preventScrolling: true
        });

        // var elems2 = document.querySelectorAll('select');
        // var instances2 = M.FormSelect.init(elems2, {});

        setListID(profile.quizzesCreated)
        setPlatformBank(platform.quizzes)
    }, [])

    useEffect(() => {
        M.FormSelect.init(elems2, {});
    }, [listID])

    return (
        <div>
            <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#addQuizToSectionModal"><i className="material-icons">add</i></a>
            <div id="addQuizToSectionModal" className="modal">
                <div className="modal-content">
                    <h4>Add A Quiz to This Section</h4>
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
                    <h4>OR</h4>
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