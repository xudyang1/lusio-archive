/**
 * 
 * @param {props} props  Takes props.msgTitle, props.msgBody, props.callback, props.id
 */

import M from "materialize-css";
import { useEffect } from "react";
export default function ConfirmModal(props) {
    const msgTitle = props.msgTitle
    const msgBody = props.msgBody
    const callback = props.callback
    const id = props.id


    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            dismissible: true,
            preventScrolling: true
        });
    })

    return (
        <div>
            <a className="right btn-floating btn-small waves-effect waves-light grey" href={"#" + id}><i className="material-icons">delete</i></a>
            <div id={"#" + id} className="modal">
                <div className="modal-content">
                    <h4>{msgTitle}</h4>
                    <p>{msgBody}</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close wave-effect btn-flat" onClick={() => { callback() }}></a>
                </div>
            </div>
        </div>
    )
}