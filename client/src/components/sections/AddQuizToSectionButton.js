import M from "materialize-css";
import { createRef, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthState";
import { ProfileContext } from "../../context/ProfileState";

export default function AddQuizToSectionButton(props) {
    const callback = props.callback
    const { user } = useContext(AuthContext)
    const { profile, getProfile } = useContext(ProfileContext)
    const [listID, setListID] = useState([])
    const [isLoading, setLoading] = useState(true)

    const selector = createRef();

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

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            dismissible: true,
            preventScrolling: true
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
            <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#addQuizToSectionModal"><i className="material-icons">add</i></a>
            <div id="addQuizToSectionModal" className="modal">
                <div className="modal-content">
                    <h4>Add A Quiz to This Section</h4>
                    <div className="row">
                        <div className="input-field col s9">
                            <input placeholder="Enter your quizID" type="text" />
                        </div>
                        <div className="col s1">
                            <input type="button" defaultValue="Submit" />
                        </div>
                    </div>
                    <h4>OR</h4>
                    <div className="row">
                        <div className="input-field col s9">
                            <select defaultValue="" ref={selector}>
                                {createOptions()}
                            </select>
                        </div>
                        <div className="col s1">
                            <input className="modal-close" style={{width: "100px"}} type="button" defaultValue="Submit" onClick={() => {
                                callback(selector.current.value)
                                //console.log(selector.current.value)
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}