import React, { createRef, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { PlatformContext } from '../../context/PlatformState';

export default function PlatformHeader(props) {
    const { id } = useParams();
    const history = useHistory();
    const { viewType, updatePlatform } = useContext(PlatformContext);
    const [editing, setEditing] = useState(false)
    const [editImg, setEditImg] = useState(false)
    const platformName = createRef();
    const bannerURL = createRef();

    var security = 0

    switch (viewType) {
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

    function onClickConfirm() {
        setEditing(false)
        updatePlatform(id, {
            mode: "EDIT",
            platform: {
                name: platformName.current.value
            }
        })
    }

    function onClickImageChange() {
        console.log(bannerURL.current.value)
        setEditImg(false)
        updatePlatform(id, {
            mode: "EDIT",
            platform: {
                bannerURI: bannerURL.current.value
            }
        })
    }

    function onClickAbout() {
        history.push(`/platform/${id}/About`)
    }

    function onClickHeader() {
        history.push(`/platform/${id}`)
    }

    return (
        <div>
            <div className="row valign-wrapper">
                <div className="col s8">
                    {
                        editing ?
                            <div className="input-field">
                                <input type="text" defaultValue={props.name} ref={platformName} />
                            </div>
                            : <h2 onClick={onClickHeader}>{props.name}</h2>
                    }
                </div>
                <div>
                    {security > 0 && !editing ? <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => { setEditing(true) }}><i className="material-icons">edit</i></a> : <div></div>}
                    {security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light red" onClick={() => { setEditing(false) }}><i className="material-icons">clear</i></a> : <div></div>}
                    {security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light green" onClick={() => onClickConfirm()}><i className="material-icons">check</i></a> : <div></div>}
                </div>
                <div className="col s2">
                    <button className="btn waves-effect waves-light">Subscribe</button>
                </div>
                <div className="col s2">
                    <button className="btn waves-effect waves-light" onClick={onClickAbout}>About</button>
                </div>
            </div>
            <div>
                <div className="row">
                    <h4>
                        {editImg ?
                            <div className="input-field">
                                <input type="text" defaultValue={props.banner} ref={bannerURL} />
                            </div>
                            : <div></div>}

                        {security > 0 ? <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => { setEditImg(true) }}><i className="material-icons">edit</i></a> : <div></div>}
                        {security > 0 && editImg ? <a className="right btn-floating btn-small waves-effect waves-light red" onClick={() => { setEditImg(false) }}><i className="material-icons">clear</i></a> : <div></div>}
                        {security > 0 && editImg ? <a className="right btn-floating btn-small waves-effect waves-light green" onClick={() => onClickImageChange()}><i className="material-icons">check</i></a> : <div></div>}
                    </h4>
                </div>
                <div className="row">
                    <div className="parallax-container">
                        <div className="parallax">
                            <img src={props.banner} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}