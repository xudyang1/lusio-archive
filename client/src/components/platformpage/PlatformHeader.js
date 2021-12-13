import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AuthContext } from '../../context/AuthState';
import { PlatformContext } from '../../context/PlatformState';
import { ProfileContext } from '../../context/ProfileState';
import M from 'materialize-css';

export default function PlatformHeader(props) {
    const { id } = useParams();
    const history = useHistory();
    const { isAuthenticated } = useContext(AuthContext);
    const { viewType, updatePlatform } = useContext(PlatformContext);
    const { profile, updateProfile } = useContext(ProfileContext);
    const [editing, setEditing] = useState(false);
    const [editImg, setEditImg] = useState(false);
    const [subToggle, setSubToggle] = useState(false);
    const [aboutToggle, setAboutToggle] = useState(false);

    const aboutButtonText = createRef();
    const platformName = createRef();

    var security = 0;

    switch (viewType) {
        case "OWNER_VIEW":
            security = 2;
            break;
        case "ADMIN_VIEW":
            security = 1;
            break;
        default:
            security = 0;
            break;
    }

    function onClickConfirm() {
        setEditing(false);
        updatePlatform(id, {
            mode: "EDIT",
            platform: {
                name: platformName.current.value
            }
        });
        M.toast({ html: 'SUCCESS!', classes: 'rounded', inDuration: 500 });
    }

    function onClickSubScribe() {
        if (isAuthenticated) {
            const payload = {
                mode: "ADD",
                profile: {
                    subscribedPlatforms: id
                }
            };
            updateProfile(payload);
            setSubToggle(true);

            // const payload2 = {
            //     mode: ""
            // }
            // updatePlatform(id, payload2)
        }
        else {
            alert("please login");
        }
    }

    function onClickUnsubScribe() {
        if (isAuthenticated) {
            const payload = {
                mode: "DELETE",
                profile: {
                    subscribedPlatforms: id
                }
            };
            updateProfile(payload);
            setSubToggle(false);
        }
        else {
            alert("please login");
        }
    }

    function onClickAbout() {
        if (aboutToggle) {
            history.push(`/platform/${id}`);
            setAboutToggle(false);
            aboutButtonText.current.innerHTML = "About";
        }
        else {
            history.push(`/platform/${id}/About`);
            setAboutToggle(true);
            aboutButtonText.current.innerHTML = "Back";
        }
    }

    useEffect(() => {
        // console.log(profile.subscribedPlatforms)
        setSubToggle(profile.subscribedPlatforms.includes(id));
    }, [profile.subscribedPlatforms]);

    function subButton() {
        if (subToggle && isAuthenticated) {
            return <button className="btn waves-effect waves-light red" onClick={() => onClickUnsubScribe()}>Unsubscribe</button>;
        }
        else {
            return <button className="btn waves-effect waves-light" onClick={() => onClickSubScribe()}>Subscribe</button>;
        }
    }
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const fileInputRef = useRef(null);
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);
    const handleChangeImage = (e) => {
        // setEditImg(false);
        // updatePlatform(id, {
        //     mode: "EDIT",
        //     platform: {
        //         bannerURI: bannerURL.current.value
        //     }
        // });
        e.preventDefault();
        console.log("image", image, preview);
        // const payload = { image: image, field: "bannerURI" };
        // updateImage(payload);
        M.toast({ html: 'SUCCESS!', classes: 'rounded', inDuration: 500 });
    };
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
                    {security > 0 && !editing ? <a className="right btn-floating btn-small waves-effect waves-light grey" onClick={() => { setEditing(true); }}><i className="material-icons">edit</i></a> : <div></div>}
                    {security > 0 && editing ? <a className="right btn-floating btn-small waves-effect waves-light red" onClick={() => { setEditing(false); }}><i className="material-icons">clear</i></a> : <div></div>}
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
                    {security > 0 ?
                        <div style={{ margin: "0.1em" }}>
                            <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file && file.type.substring(0, 5) === "image") {
                                        setImage(file);
                                    } else {
                                        setImage(null);
                                    }
                                }} />
                            <div className="btn" style={{ margin: "0.2em" }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    fileInputRef.current.click();
                                }}>Choose Image</div>
                            {preview ? <div className="btn" style={{ margin: "0.2em" }} onClick={handleChangeImage}>Save</div> : <></>}
                            {preview ? <div className="btn"
                                onClick={() => { setImage(null); setPreview(null); }}>Cancel</div> : <></>}
                        </div>
                        : <></>
                    }
                </div>
                <div className="row">
                    <div className="parallax-container">
                        <div className="parallax">
                            <img src={preview || props.banner} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}