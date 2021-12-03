import { useEffect, useRef } from "react"
import M from "materialize-css";
import ConfirmModal from "../common/ConfirmModal";

/**
 * 
 * @param {props} props takes 
 * callback
 * buttonText
 * title
 * msg
 * id
 * type: ADD | REMOVE | TRANSFER
 * @returns 
 */
export default function PlatformAdminControl({ callback, buttonText, title, msg, id, type, listProfiles }) {

    const inputfield = useRef(null)
    const selector = useRef(null)

    var elems2 = document.querySelectorAll('select');

    function createOptions() {
        let opts = []
        listProfiles.map((element, index) => {
            opts.push(<option value={element._id} key={index}>{element.name}</option>)
        })
        return opts
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            dismissible: true,
            preventScrolling: true
        });
    }, [])

    useEffect(() => {
        M.FormSelect.init(elems2, {});
    }, [listProfiles])

    return (
        <div>
            <a className="waves-effect waves-light btn modal-trigger red modal-trigger" href={"#" + id}>{buttonText}</a>
            <div id={id} className="modal">
                <div className="modal-content">
                    <h4>{title}</h4>
                    <h5>{msg}</h5>
                    {
                        type == "ADD" ?
                            <div>
                                <div className="input-field col s9">
                                    <input placeholder="Username" id="user_name" type="text" ref={inputfield} />
                                </div>
                                <div className="col s1">
                                    <input className="modal-close" style={{ width: "100px" }} type="button" defaultValue="Submit" onClick={() => {
                                        callback(inputfield.current.value)
                                    }} />
                                </div>
                            </div> : <div></div>
                    }
                    {
                        type == "REMOVE" ?
                            <div>
                                <div className="input-field col s9">
                                    <select defaultValue="" ref={selector}>
                                        {createOptions()}
                                    </select>
                                </div>
                                <div className="col s1">
                                    <input className="modal-close" style={{ width: "100px" }} type="button" defaultValue="Submit" onClick={() => {
                                        callback(selector.current.value)
                                    }} />
                                </div>
                            </div> : <div></div>
                    }
                    {
                        type == "TRANSFER" ?
                            <div>
                                <div className="input-field col s9">
                                    <select defaultValue="" ref={selector}>
                                        {createOptions()}
                                    </select>
                                </div>
                                <div className="col s1">
                                    <input className="modal-close" style={{ width: "100px" }} type="button" defaultValue="Submit" onClick={() => {
                                        callback(selector.current.value)
                                    }} />
                                </div>
                            </div> : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}