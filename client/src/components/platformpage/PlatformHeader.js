import React, { createRef, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AuthContext } from '../../context/AuthState';
import { PlatformContext } from '../../context/PlatformState';
import { ProfileContext } from '../../context/ProfileState';

export default function PlatformHeader(props) {
    const { id } = useParams();
    const history = useHistory();
    const { isAuthenticated } = useContext(AuthContext);
    const { viewType, updatePlatform } = useContext(PlatformContext);
    const { profile, updateProfile } = useContext(ProfileContext);
    const [editing, setEditing] = useState(false)
    const [editImg, setEditImg] = useState(false)
    const [subToggle, setSubToggle] = useState(false)
    const [aboutToggle, setAboutToggle] = useState(false)

    const aboutButtonText = createRef();
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

    function onClickSubScribe() {
        if(isAuthenticated){
            const payload = {
                mode: "ADD",
                profile: {
                    subscribedPlatforms: id
                }
            }
            updateProfile(payload)
            setSubToggle(true)
        }
        else{
            alert("please login")
        }
    }

    function onClickUnsubScribe() {
        if(isAuthenticated){
            const payload = {
                mode: "DELETE",
                profile: {
                    subscribedPlatforms: id
                }
            }
            updateProfile(payload)
            setSubToggle(false)
        }
        else{
            alert("please login")
        }
    }

    function onClickAbout() {
        if(aboutToggle){
            history.push(`/platform/${id}`)
            setAboutToggle(false)
            aboutButtonText.current.innerHTML = "About"
        }
        else{
            history.push(`/platform/${id}/About`)
            setAboutToggle(true)
            aboutButtonText.current.innerHTML = "Back"
        }
    }

    useEffect(() => {
        // console.log(profile.subscribedPlatforms)
        setSubToggle(profile.subscribedPlatforms.includes(id))
    }, [profile.subscribedPlatforms])

    function subButton() {
        if (subToggle && isAuthenticated) {
            return <button className="btn waves-effect waves-light red" onClick={() => onClickUnsubScribe()}>Unsubscribe</button>
        }
        else {
            return <button className="btn waves-effect waves-light" onClick={() => onClickSubScribe()}>Subscribe</button>
        }
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
                            : <h2>{props.name}</h2>
                    }
                </div>
                <div>
                    {security > 0 && !editing ? <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => { setEditing(true) }}><i className="material-icons">edit</i></a> : <div></div>}
                    {security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light red" onClick={() => { setEditing(false) }}><i className="material-icons">clear</i></a> : <div></div>}
                    {security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light green" onClick={() => onClickConfirm()}><i className="material-icons">check</i></a> : <div></div>}
                </div>
                <div className="col s2">
                    {/* {security > 0 ? <div></div> : <button className="btn waves-effect waves-light" onClick={() => onClickSubScribe()}>Subscribe</button>} */}
                    {subButton()}
                </div>
                <div className="col s2">
                    <button className="btn waves-effect waves-light" onClick={onClickAbout} ref={aboutButtonText}>About</button>
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